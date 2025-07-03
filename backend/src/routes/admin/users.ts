import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

// Middlewares
import { authorizeRole } from '../../middlewares/authorizeRole';
import { validateParams } from '../../middlewares/validateParams';
import { validateBody } from '../../middlewares/validateBody';

// Utils
import { asyncHandler } from '../../utils/asyncHandler';
import { handlePrismaError } from '../../utils/handlePrismaError';

// Validation Schema
import { createUserSchema } from '../../schemas/user/createUserSchema';
import { updateUserSchema } from '../../schemas/user/updateUserSchema';
import { getUserParamsSchema } from 'schemas/user/getUserParamsSchema';

const prisma = new PrismaClient();
const router = Router();

// 모든 라우터는 관리자권한으로만
router.use(authorizeRole('ADMIN'));

// 모든 사용자 조회 (GET /admin/users)
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const users = await prisma.user.findMany();
    res.json(users);
  })
);

// 사용자 생성 (POST /admin/users)
router.post(
  '/',
  validateBody(createUserSchema),
  asyncHandler(async (req, res) => {
    const newUser = await prisma.user.create({
      data: req.body,
    });
    res.status(201).json(newUser);
  })
);

// 사용자 수정 (PATCH /admin/users/:id)
router.patch(
  '/:id',
  validateParams(getUserParamsSchema),
  validateBody(updateUserSchema),
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const updateUser = await prisma.user.update({
      where: { id },
      data: req.body,
    });
    res.json(updateUser);
  })
);

// 사용자 삭제 (DELETE /admin/users/:id)
router.delete(
  '/:id',
  validateParams(getUserParamsSchema),
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    await prisma.user.delete({
      where: { id },
    });
    res.status(204).send();
  })
);

export default router;
