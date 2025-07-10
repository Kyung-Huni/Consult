import { Router } from 'express';
import { prisma } from '../prisma';

import { asyncHandler } from '../utils/asyncHandler';
import { validateParams } from '../middlewares/validateParams';
import { validateBody } from '../middlewares/validateBody';

import { getStudentParamsSchema } from '../schemas/student/getStudentParamsSchema';
import { createExamSchema } from '../schemas/exam/createExamSchema';

const router = Router({ mergeParams: true });

// ✅ GET /students/:id/exams
router.get(
  '/',
  validateParams(getStudentParamsSchema),
  asyncHandler(async (req, res) => {
    const { id } = req.params;

    const exams = await prisma.exam.findMany({
      where: { studentId: id },
      orderBy: { date: 'desc' },
    });

    const parsedExams = exams.map((exam) => ({
      ...exam,
      scores:
        typeof exam.scores === 'string' ? JSON.parse(exam.scores) : exam.scores,
    }));

    res.json(parsedExams);
  })
);

// ✅ POST /students/:id/exams
router.post(
  '/',
  validateParams(getStudentParamsSchema),
  // validateBody(createExamSchema), 나중에 조정 후 추가
  asyncHandler(async (req, res) => {
    console.log('headers:', req.headers);
    console.log('raw body:', req.body);
    const { id } = req.params;
    const { type, date, scores } = req.body;

    const newExam = await prisma.exam.create({
      data: {
        studentId: id,
        type,
        date: new Date(date),
        scores,
      },
    });

    res.status(201).json(newExam);
  })
);

export default router;
