import { Router } from 'express';
import { prisma } from '../prisma'; // or your correct prisma import path
import { asyncHandler } from '../utils/asyncHandler';

const router = Router();

// 전체 일정 조회: Meeting + Checklist
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const meetings = await prisma.meeting.findMany({
      include: { student: true },
    });

    const checklists = await prisma.checklistItem.findMany({
      include: { student: true },
    });

    const events = [
      ...meetings.map((m) => ({
        id: `meeting-${m.id}`,
        title: `${m.student.name} 상담`,
        start: m.startTime,
        end: m.endTime,
        type: 'meeting',
        color: 'blue',
        studentId: m.studentId,
      })),
      ...checklists.map((c) => ({
        id: `checklist-${c.id}`,
        title: `${c.student.name} 마감: ${c.title}`,
        start: c.dueDate,
        allDay: true,
        type: 'checklist',
        color: 'orange',
        studentId: c.studentId,
      })),
    ];

    res.json(events);
  })
);

export default router;
