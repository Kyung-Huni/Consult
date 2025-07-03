import { Router } from 'express';
import { prisma } from '../prisma';

import { authenticateJWT } from '../middlewares/authMiddleware';
import { validateParams } from '../middlewares/validateParams';
import { validateBody } from '../middlewares/validateBody';

import { asyncHandler } from '../utils/asyncHandler';

import { createStudentSchema } from '../schemas/student/createStudentSchema';
import { updateAccessSchema } from '../schemas/student/updateAccessSchema';
import { getStudentParamsSchema } from '../schemas/student/getStudentParamsSchema';

const router = Router();

router.use(authenticateJWT);

router.get(
  '/',
  asyncHandler(async (req, res) => {
    const students = await prisma.student.findMany({
      orderBy: { createdAt: 'desc' },
    });

    res.json(students);
  })
);

router.post(
  '/',
  validateBody(createStudentSchema),
  asyncHandler(async (req, res) => {
    const newStudent = await prisma.student.create({
      data: req.body,
    });

    res.status(201).json(newStudent);
  })
);

// GET /student/:id
router.get(
  '/:id',
  validateParams(getStudentParamsSchema),
  asyncHandler(async (req, res) => {
    const { id } = req.params;

    const student = await prisma.student.findUnique({
      where: { id },
    });

    if (!student) {
      res.status(404).json({ error: 'Student not found' });
      return;
    }

    res.json(student);
  })
);

router.patch(
  '/:id/access',
  validateParams(getStudentParamsSchema),
  validateBody(updateAccessSchema),
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const data = req.body;

    const updated = await prisma.student.update({
      where: { id },
      data,
    });

    res.json(updated);
  })
);

export default router;
