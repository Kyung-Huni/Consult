import { Router } from 'express';
import { prisma } from '../prisma'; // 너의 prisma import 경로에 맞게
import { asyncHandler } from '../utils/asyncHandler';
import NotFoundError from '../errors/NotFoundError';

import { validateBody } from '../middlewares/validateBody';
import { validateParams } from '../middlewares/validateParams';
import { getMeetingParamsSchema } from '../schemas/meeting/getMeetingParamSchema';
import { getMeetingNoteSchema } from '../schemas/meeting/getMeetingNoteSchema';

const router = Router();

// 전체 미팅 리스트 조회
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const meetings = await prisma.meeting.findMany({
      include: { student: true },
      orderBy: { startTime: 'desc' },
    });

    res.json(
      meetings.map((m) => ({
        id: m.id,
        student: m.student.name,
        date: m.startTime,
        title: m.title,
        note: m.note,
        summary: `회의 요약 또는 제목 기반`,
      }))
    );
  })
);

// 개별 미팅 상세 조회
router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const { id } = req.params;

    const meeting = await prisma.meeting.findUnique({
      where: { id },
      include: { student: true },
    });

    if (!meeting)
      throw new NotFoundError({ message: '회의를 찾을 수 없습니다' });

    res.json({
      id: meeting.id,
      student: meeting.student.name,
      date: meeting.startTime,
      title: meeting.title,
      note: meeting.note,
      summary: `요약 내용 (나중에 AI가 생성해도 OK)`,
    });
  })
);

router.put(
  '/:id',
  validateParams(getMeetingParamsSchema),
  validateBody(getMeetingNoteSchema),
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { note } = req.body;

    const updated = await prisma.meeting.update({
      where: { id },
      data: { note },
    });

    res.json({ success: true, id: updated.id });
  })
);

export default router;
