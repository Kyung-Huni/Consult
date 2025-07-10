import { Router } from 'express';
import { prisma } from '../prisma';
import {
  authenticateJWT,
  AuthenticatedRequest,
} from '../middlewares/authMiddleware';
import { asyncHandler } from '../utils/asyncHandler';

const router = Router();

router.get(
  '/',
  authenticateJWT,
  asyncHandler(async (req: AuthenticatedRequest, res) => {
    const userId = req.user!.id;

    const [checklist, meetings, todos] = await Promise.all([
      prisma.checklistItem.findMany({
        where: { userId },
        include: { student: true },
        orderBy: { dueDate: 'asc' },
        take: 5,
      }),
      prisma.meeting.findMany({
        where: { student: { userId } },
        include: { student: true },
        orderBy: { startTime: 'asc' },
        take: 5,
      }),
      prisma.studentToDo.findMany({
        where: { student: { userId } },
        include: { student: true },
        orderBy: { due: 'asc' },
        take: 5,
      }),
    ]);

    res.json({ checklist, meetings, todos });
  })
);

export default router;
