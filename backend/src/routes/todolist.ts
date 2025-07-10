import { Router } from 'express';
import { prisma } from '../prisma';
import { authenticateJWT } from '../middlewares/authMiddleware';
import { asyncHandler } from '../utils/asyncHandler';
import { validateParams } from '../middlewares/validateParams';
import { validateBody } from '../middlewares/validateBody';
import { getStudentParamsSchema } from '../schemas/student/getStudentParamsSchema';
import { createStudentToDoSchema } from '../schemas/todo/createStudentToDoSchema';
import { updateStudentToDoSchema } from '../schemas/todo/updateStudentToDoSchema';

const router = Router({ mergeParams: true });
router.use(authenticateJWT);

// ✅ GET /students/:id/todo
router.get(
  '/',
  validateParams(getStudentParamsSchema),
  asyncHandler(async (req, res) => {
    const todos = await prisma.studentToDo.findMany({
      where: { studentId: req.params.id },
      orderBy: { due: 'asc' },
    });
    res.json(todos);
  })
);

// ✅ POST /students/:id/todo
router.post(
  '/',
  validateParams(getStudentParamsSchema),
  validateBody(createStudentToDoSchema),
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { text, due } = req.body;

    const todo = await prisma.studentToDo.create({
      data: {
        studentId: id,
        text,
        due: new Date(due),
      },
    });

    res.status(201).json(todo);
  })
);

// ✅ PATCH /students/:id/todo/:todoId
router.patch(
  '/:id',
  validateParams(getStudentParamsSchema),
  validateBody(updateStudentToDoSchema),
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { done } = req.body;

    const updated = await prisma.studentToDo.update({
      where: { id: id },
      data: { done },
    });

    res.json(updated);
  })
);

// ✅ DELETE /students/:id/todo/:todoId
router.delete(
  '/:id',
  validateParams(getStudentParamsSchema),
  asyncHandler(async (req, res) => {
    const { id } = req.params;

    await prisma.studentToDo.delete({
      where: { id: id },
    });

    res.status(204).end();
  })
);

export default router;
