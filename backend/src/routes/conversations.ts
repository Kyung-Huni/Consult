// routes/conversation.ts
import { Router } from 'express';
import { prisma } from '../prisma';
import { asyncHandler } from '../utils/asyncHandler';
import { validateParams } from '../middlewares/validateParams';
import { validateBody } from '../middlewares/validateBody';
import { getStudentParamsSchema } from '../schemas/student/getStudentParamsSchema';
import { createConversationSchema } from '../schemas/conversation/createConversationSchema';

const router = Router({ mergeParams: true });

// ✅ GET /students/:id/conversations
router.get(
  '/',
  validateParams(getStudentParamsSchema),
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const conversations = await prisma.conversation.findMany({
      where: { studentId: id },
      orderBy: { createdAt: 'asc' },
    });
    res.json(conversations);
  })
);

// ✅ POST /students/:id/conversations
router.post(
  '/',
  validateParams(getStudentParamsSchema),
  validateBody(createConversationSchema),
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { text, sender } = req.body;

    const newMessage = await prisma.conversation.create({
      data: {
        studentId: id,
        text,
        sender,
      },
    });

    res.status(201).json(newMessage);
  })
);

export default router;
