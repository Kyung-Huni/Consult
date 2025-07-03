import { Router } from 'express';
import { prisma } from '../prisma';

import { validateParams } from '../middlewares/validateParams';
import { validateBody } from '../middlewares/validateBody';
import { asyncHandler } from '../utils/asyncHandler';

import { getItemParamsSchema } from '../schemas/checklist/getItemParamsSchema';
import { getStudentParamsSchema } from '../schemas/student/getStudentParamsSchema';
import { createChecklistItemSchema } from '../schemas/checklist/createChecklistItemSchema';

const router = Router({ mergeParams: true });

// ✅ GET /students/:studentId/checklist
router.get(
  '/',
  validateParams(getStudentParamsSchema),
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const items = await prisma.checklistItem.findMany({
      where: { studentId: id },
      orderBy: { createdAt: 'desc' },
    });

    res.json(items);
  })
);

// ✅ POST /students/:studentId/checklist
router.post(
  '/',
  validateParams(getStudentParamsSchema),
  validateBody(createChecklistItemSchema),
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { title, dueDate } = req.body;

    const newItem = await prisma.checklistItem.create({
      data: {
        studentId: id,
        title,
        dueDate: dueDate ? new Date(dueDate) : undefined,
      },
    });

    res.status(201).json(newItem);
  })
);

// ✅ PATCH /students/:studentId/checklist/:itemId
router.patch(
  '/:id',
  validateParams(getItemParamsSchema), // studentId
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { isCompleted } = req.body;

    const updatedItem = await prisma.checklistItem.update({
      where: { id },
      data: { isCompleted },
    });

    res.json(updatedItem);
  })
);

// ✅ DELETE /students/:studentId/checklist/:itemId
router.delete(
  '/:id',
  validateParams(getItemParamsSchema),
  asyncHandler(async (req, res) => {
    const { id } = req.params;

    await prisma.checklistItem.delete({
      where: { id },
    });

    res.status(204).send();
  })
);

export default router;
