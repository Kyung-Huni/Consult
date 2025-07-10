import { Router } from 'express';
import { prisma } from '../prisma';

import { asyncHandler } from '../utils/asyncHandler';
import { validateParams } from '../middlewares/validateParams';
import { validateBody } from '../middlewares/validateBody';

import { getStudentParamsSchema } from '../schemas/student/getStudentParamsSchema';
import { createTimeLogSchema } from '../schemas/timelog/createTimeLogSchema';

const router = Router({ mergeParams: true });

// GET /students/:id/timelogs
router.get(
  '/',
  validateParams(getStudentParamsSchema),
  asyncHandler(async (req, res) => {
    const { id } = req.params;

    const logs = await prisma.timeLog.findMany({
      where: { studentId: id },
      orderBy: { date: 'desc' },
    });

    res.json(logs);
  })
);

// POST /students/:id/timelogs
router.post(
  '/',
  validateParams(getStudentParamsSchema),
  validateBody(createTimeLogSchema),
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { date, duration, description, billable, status } = req.body;

    const newLog = await prisma.timeLog.create({
      data: {
        studentId: id,
        date: new Date(date),
        duration,
        description,
        billable,
        status,
      },
    });

    res.status(201).json(newLog);
  })
);

export default router;
