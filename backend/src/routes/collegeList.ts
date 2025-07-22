import { Router } from 'express';
import { prisma } from '../prisma';
import { asyncHandler } from '../utils/asyncHandler';
import { validateParams } from '../middlewares/validateParams';
import { validateBody } from '../middlewares/validateBody';
import { getStudentParamsSchema } from '../schemas/student/getStudentParamsSchema';
import { getCollegeInfoSchema } from '../schemas/college/getCollegeInfoSchema';
import { updateStudentCollegeSchema } from '../schemas/college/updateStudentCollegeSchema';
import { getStudentCollegeParamsSchema } from '../schemas/student/getStudentCollegeParamsSchema';

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
      location: item.college.location,
      status: item.status,
      isSuggested: item.isSuggested,
    }));

    res.json(formatted);
  })
);

// ✅ POST /students/:id/colleges
router.post(
  '/',
  validateParams(getStudentParamsSchema),
  validateBody(getCollegeInfoSchema),
  asyncHandler(async (req, res) => {
    const { id: studentId } = req.params;
    const {
      id,
      name,
      location = '',
      status = 'Recommended',
      isSuggested = true,
    } = req.body;
    console.log(req.body);

    const collegeId = id;

    console.log(collegeId);
    // College 존재 확인 또는 생성
    let college = await prisma.college.findUnique({ where: { id: collegeId } });

    if (!college) {
      college = await prisma.college.create({
        data: {
          id: collegeId,
          name,
          location,
        },
      });
    }

    // StudentCollege 중복 확인
    const exists = await prisma.studentCollege.findUnique({
      where: {
        studentId_collegeId: {
          studentId,
          collegeId: college.id,
        },
      },
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

// ✅ PUT /students/:id/colleges/:collegeId
router.put(
  '/:collegeId',
  validateParams(getStudentCollegeParamsSchema),
  validateBody(updateStudentCollegeSchema),
  asyncHandler(async (req, res) => {
    const studentId = req.params.id;
    const { collegeId } = req.params;
    const { status, isSuggested } = req.body;

    await prisma.studentCollege.update({
      where: {
        studentId_collegeId: {
          studentId,
          collegeId,
        },
      },
      data: {
        ...(status && { status }),
        ...(typeof isSuggested === 'boolean' && { isSuggested }),
      },
    });

    res.status(200).json({ success: true });
  })
);

// ✅ DELETE /students/:id/colleges/:collegeId
router.delete(
  '/:collegeId',
  validateParams(getStudentCollegeParamsSchema),
  asyncHandler(async (req, res) => {
    const studentId = req.params.id;
    const { collegeId } = req.params;

    console.log(studentId, collegeId);

    await prisma.studentCollege.delete({
      where: { studentId_collegeId: { studentId, collegeId } },
    });

    res.json({ success: true });
  })
);

export default router;
