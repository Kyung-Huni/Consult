import { Router } from 'express';
import { prisma } from '../prisma';

import { validateParams } from '../middlewares/validateParams';
import { validateBody } from '../middlewares/validateBody';
import { asyncHandler } from '../utils/asyncHandler';

import { getItemParamsSchema } from '../schemas/checklist/getItemParamsSchema';
import { getStudentParamsSchema } from '../schemas/student/getStudentParamsSchema';
import { createChecklistItemSchema } from '../schemas/checklist/createChecklistItemSchema';

import { AuthenticatedRequest } from '../middlewares/authMiddleware';

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
  asyncHandler(async (req: AuthenticatedRequest, res) => {
    const { id } = req.params;
    const { title, dueDate } = req.body;

    const newItem = await prisma.checklistItem.create({
      data: {
        userId: req.user!.id,
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
  asyncHandler(async (req: AuthenticatedRequest, res) => {
    const { id } = req.params;
    const { isCompleted } = req.body;

    const item = await prisma.checklistItem.findUnique({
      where: { id },
    });

    if (!item || item.userId !== req.user!.id) {
      res.status(403).json({ error: '권한이 없습니다.' });
    }

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
  asyncHandler(async (req: AuthenticatedRequest, res) => {
    const { id } = req.params;

    const item = await prisma.checklistItem.findUnique({
      where: { id },
    });

    if (!item || item.userId !== req.user!.id) {
      res.status(403).json({ error: '권한이 없습니다.' });
    }

    await prisma.checklistItem.delete({
      where: { id },
    });

    res.status(204).send();
  })
);

export default router;
