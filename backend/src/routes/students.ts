import { Router, Response } from 'express';
import { prisma } from '../prisma';

import {
  AuthenticatedRequest,
  authenticateJWT,
} from '../middlewares/authMiddleware';
import { validateParams } from '../middlewares/validateParams';
import { validateBody } from '../middlewares/validateBody';

import { asyncHandler } from '../utils/asyncHandler';

import { createStudentSchema } from '../schemas/student/createStudentSchema';
import { updateAccessSchema } from '../schemas/student/updateAccessSchema';
import { getStudentParamsSchema } from '../schemas/student/getStudentParamsSchema';
import EmailAlreadyExistsError from '../errors/EmailAlreadyExistsError';

const router = Router({ mergeParams: true });

router.use(authenticateJWT);

router.get(
  '/',
  asyncHandler(async (req, res) => {
    const students = await prisma.student.findMany({
      orderBy: { createdAt: 'desc' },
    });

    res.json(students);
  })
);

router.post(
  '/',
  authenticateJWT,
  validateBody(createStudentSchema),
  asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    if (!req.user?.id) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const userId = req.user.id;
    const { name, email, phone, school, grade, allowLogin, canEditChecklist } =
      req.body;

    const existing = await prisma.student.findUnique({ where: { email } });
    if (existing) {
      throw new EmailAlreadyExistsError();
    }

    const newStudent = await prisma.student.create({
      data: {
        name,
        email,
        phone,
        school,
        grade,
        allowLogin,
        canEditChecklist,
        userId,
        contactinfo: {
          create: {
            email,
            phone,
            school,
            grade,
          },
        },
      },
      include: {
        contactinfo: true,
      },
    });

    res.status(201).json(newStudent);
  })
);

// GET /student/:id
router.get(
  '/:id',
  validateParams(getStudentParamsSchema),
  asyncHandler(async (req, res) => {
    const { id } = req.params;

    const student = await prisma.student.findUnique({
      where: { id },
    });

    if (!student) {
      res.status(404).json({ error: 'Student not found' });
    }

    res.json(student);
  })
);

router.delete(
  '/:id',
  validateParams(getStudentParamsSchema),
  authenticateJWT,
  asyncHandler(async (req, res) => {
    const { id } = req.params;

    await prisma.student.delete({
      where: { id },
    });

    res.status(204).send(); // No Content
  })
);

router.get(
  '/:id/access',
  validateParams(getStudentParamsSchema),
  asyncHandler(async (req, res) => {
    const { id } = req.params;

    const access = await prisma.student.findUnique({
      where: { id },
      select: {
        allowLogin: true,
        canEditChecklist: true,
      },
    });

    if (!access) {
      res.status(404).json({ message: 'Student not found' });
    }

    res.json(access);
  })
);

router.patch(
  '/:id/access',
  validateParams(getStudentParamsSchema),
  validateBody(updateAccessSchema),
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const data = req.body;

    const updated = await prisma.student.update({
      where: { id },
      data,
    });

    res.json(updated);
  })
);

export default router;
