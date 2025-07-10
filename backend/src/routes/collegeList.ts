import { Router } from 'express';
import { prisma } from '../prisma';
import { asyncHandler } from '../utils/asyncHandler';
import { validateParams } from '../middlewares/validateParams';
import { validateBody } from '../middlewares/validateBody';
import { getStudentParamsSchema } from '../schemas/student/getStudentParamsSchema';
import { getCollegeInfoSchema } from '../schemas/college/getCollegeInfoSchema';

import slugify from 'slugify';

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
    }));

    res.json(formatted);
  })
);

router.post(
  '/',
  validateParams(getStudentParamsSchema),
  validateBody(getCollegeInfoSchema),
  asyncHandler(async (req, res) => {
    const { id: studentId } = req.params;
    const {
      name,
      location = '',
      status = 'Recommended',
      isSuggested = true,
    } = req.body;

    console.log('[DEBUG] name:', name);

    // slug 생성
    const slug = slugify(name, { lower: true, strict: true });
    console.log('[DEBUG] slug:', slug);

    // College가 이미 DB에 있는지 확인
    let college = await prisma.college.findUnique({ where: { slug } });

    if (!college) {
      college = await prisma.college.create({
        data: {
          name,
          slug,
          location,
        },
      });
    }

    // StudentCollege 연결 (중복 방지)
    const exists = await prisma.studentCollege.findUnique({
      where: { studentId_collegeId: { studentId, collegeId: college.id } },
    });

    if (!exists) {
      await prisma.studentCollege.create({
        data: {
          studentId,
          collegeId: college.id,
          status,
          isSuggested,
        },
      });
    }

    res.status(201).json({ success: true });
  })
);

export default router;
