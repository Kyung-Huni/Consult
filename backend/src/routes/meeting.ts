import { Router } from 'express';
import { prisma } from '../prisma';

import { validateParams } from '../middlewares/validateParams';
import { validateBody } from '../middlewares/validateBody';
import { asyncHandler } from '../utils/asyncHandler';

import { getStudentParamsSchema } from '../schemas/student/getStudentParamsSchema';
import { createMeetingSchema } from '../schemas/meeting/createMeetingSchema';

const router = Router({ mergeParams: true });

// GET /students/:id/meeting
router.get(
  '/',
  validateParams(getStudentParamsSchema),
  asyncHandler(async (req, res) => {
    console.log('📌 req.params:', req.params); // 👈 확인해보자

    const { id } = req.params;
    const meetings = await prisma.meeting.findMany({
      where: { studentId: id },
      orderBy: { startTime: 'desc' },
    });
    res.json(meetings);
  })
);

// POST /students/:id/meeting
router.post(
  '/',
  validateParams(getStudentParamsSchema),
  validateBody(createMeetingSchema),
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { title, note, startTime, endTime } = req.body;

    const newMeeting = await prisma.meeting.create({
      data: {
        studentId: id,
        title,
        note,
        startTime: new Date(startTime),
        endTime: new Date(endTime),
      },
    });

    res.status(201).json(newMeeting);
  })
);

// PATCH /students/:id/meeting/:meetingId
router.patch(
  '/:id',
  validateParams(getStudentParamsSchema),
  validateBody(createMeetingSchema), // 전체 필드 수정 기준
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { title, note, startTime, endTime } = req.body;

    const updated = await prisma.meeting.update({
      where: { id: id },
      data: {
        title,
        note,
        startTime: new Date(startTime),
        endTime: new Date(endTime),
      },
    });

    res.json(updated);
  })
);

// DELETE /students/:id/meeting/:meetingId
router.delete(
  '/:id',
  validateParams(getStudentParamsSchema),
  asyncHandler(async (req, res) => {
    const { id } = req.params;

    await prisma.meeting.delete({
      where: { id: id },
    });

    res.status(204).send();
  })
);

export default router;
