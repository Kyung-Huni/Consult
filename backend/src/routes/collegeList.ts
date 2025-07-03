import { Router } from 'express';
import { prisma } from '../prisma';
import { asyncHandler } from '../utils/asyncHandler';
import { validateParams } from '../middlewares/validateParams';
import { getStudentParamsSchema } from '../schemas/student/getStudentParamsSchema';

const router = Router({ mergeParams: true });

// ✅ GET /students/:id/colleges
router.get(
  '/',
  validateParams(getStudentParamsSchema),
  asyncHandler(async (req, res) => {
    const { id } = req.params;

    const colleges = await prisma.studentCollege.findMany({
      where: { studentId: id },
      include: {
        college: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    const formatted = colleges.map((item) => ({
      id: item.college.id,
      name: item.college.name,
      slug: item.college.slug,
      location: item.college.location,
      status: item.status,
    }));

    res.json(formatted);
  })
);

export default router;
