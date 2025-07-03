import { Router } from 'express';
import { prisma } from '../prisma';

import { asyncHandler } from '../utils/asyncHandler';
import { validateParams } from '../middlewares/validateParams';
import { validateBody } from '../middlewares/validateBody';

import { getStudentParamsSchema } from '../schemas/student/getStudentParamsSchema';
import { createStudentNoteSchema } from '../schemas/note/createStudentNoteSchema';

const router = Router({ mergeParams: true });

// 🔍 GET /students/:id/notes
router.get(
  '/',
  validateParams(getStudentParamsSchema),
  asyncHandler(async (req, res) => {
    const { id } = req.params;

    const notes = await prisma.studentNote.findMany({
      where: { studentId: id },
      orderBy: { createdAt: 'desc' },
    });

    res.json(notes);
  })
);

// ➕ POST /students/:id/notes
router.post(
  '/',
  validateParams(getStudentParamsSchema),
  validateBody(createStudentNoteSchema),
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { content } = req.body;

    const newNote = await prisma.studentNote.create({
      data: {
        studentId: id,
        content,
      },
    });

    res.status(201).json(newNote);
  })
);

// ❌ DELETE /students/:id/notes/:noteId
router.delete(
  '/:id',
  validateParams(getStudentParamsSchema),
  asyncHandler(async (req, res) => {
    const { id } = req.params;

    await prisma.studentNote.delete({
      where: { id: id },
    });

    res.status(204).send();
  })
);

export default router;
