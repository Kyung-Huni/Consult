import { Router } from 'express';
import { prisma } from '../prisma';
import { authenticateJWT } from '../middlewares/authMiddleware';
import { asyncHandler } from '../utils/asyncHandler';
import { contactInfoSchema } from '../schemas/contactInfo/createContactInfoSchema';

import { validateParams } from '../middlewares/validateParams';
import { getStudentParamsSchema } from '../schemas/student/getStudentParamsSchema';

const router = Router({ mergeParams: true });
router.use(authenticateJWT);
router.use(validateParams(getStudentParamsSchema));

// GET /students/:id/contact-info (학생 ID 기준)
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const { id } = req.params;

    const contact = await prisma.contactInfo.findUnique({
      where: { studentId: id },
    });
    res.json(contact || {});
  })
);

// POST /students/:id/contact-info
router.post(
  '/',
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const data = await contactInfoSchema.validate(req.body);

    const contact = await prisma.contactInfo.create({
      data: { ...data, studentId: id },
    });
    res.status(201).json(contact);
  })
);

// PUT /students/:id/contact-info
router.put(
  '/',
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const data = await contactInfoSchema.validate(req.body);

    const contact = await prisma.contactInfo.update({
      where: { studentId: id },
      data,
    });
    res.json(contact);
  })
);
export default router;
