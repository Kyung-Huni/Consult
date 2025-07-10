import { Router, Request, Response } from 'express';
import { prisma } from '../prisma';
import { User } from '@prisma/client';
import bcrypt from 'bcrypt';

// Middlewares
import {
  authenticateJWT,
  AuthenticatedRequest,
} from '../middlewares/authMiddleware';
import { authorizeRole } from '../middlewares/authorizeRole';
import { authorizeSelfOrAdmin } from '../middlewares/authorizeSelfOrAdmin';

// Utils
import { asyncHandler } from '../utils/asyncHandler';

// Errors
import AuthError from '../errors/AuthError';
import UserNotFoundError from '../errors/NotFoundError';

// Validation Schema
import { getUserParamsSchema } from '../schemas/user/getUserParamsSchema';
import { updateUserSchema } from '../schemas/user/updateUserSchema';
import { validateBody } from '../middlewares/validateBody';
import { validateParams } from '../middlewares/validateParams';

const router = Router();

interface UserInput {
  email?: string;
  name?: string;
  password?: string;
}

type SafeUser = Pick<User, 'id' | 'email' | 'name'>;

// GET /users — 모든 유저 조회
router.get(
  '/',
  authenticateJWT,
  authorizeRole('ADMIN'),
  asyncHandler(async (req: Request, res: Response<User[]>) => {
    const users = await prisma.user.findMany();
    res.json(users);
  })
);

// 에러 테스트
router.get(
  '/error',
  asyncHandler(async (req, res) => {
    console.log('✅ [에러 라우터 진입]');
    throw new AuthError({
      message: '🔥 테스트 인증 실패',
      context: { ip: req.ip },
      logging: true,
    });
  })
);

router.get(
  '/admin-only',
  authenticateJWT,
  authorizeRole('ADMIN'),
  asyncHandler(async (req: AuthenticatedRequest, res) => {
    res.send('관리자만 접근 가능합니다');
  })
);

// 로그인 사용자 정보 조회
router.get(
  '/me',
  authenticateJWT,
  asyncHandler(
    async (req: AuthenticatedRequest, res: Response<{ user: SafeUser }>) => {
      if (!req.user) {
        throw new AuthError({ context: { token: null } });
      }

      const { id, email, name } = req.user;
      res.json({ user: { id, email, name } });
    }
  )
);

// 로그인 사용자 정보 수정
router.patch(
  '/me',
  validateBody(updateUserSchema),
  authenticateJWT,
  asyncHandler(async (req: AuthenticatedRequest, res: Response<SafeUser>) => {
    if (!req.user) {
      throw new AuthError({ context: { token: null } });
    }

    const { email, name, password } = req.body;
    const updateData: UserInput = {};
    if (email) updateData.email = email;
    if (name) updateData.name = name;
    if (password) updateData.password = await bcrypt.hash(password, 10);

    const user = await prisma.user.update({
      where: { id: req.user.id },
      data: updateData,
    });

    const { password: _, ...safeUser } = user;
    res.json(safeUser);
  })
);

// 로그인 사용자 계정 삭제
router.delete(
  '/me',
  authenticateJWT,
  asyncHandler(
    async (req: AuthenticatedRequest, res: Response<{ message: string }>) => {
      if (!req.user) {
        throw new AuthError({ context: { token: null } });
      }

      await prisma.user.delete({
        where: { id: req.user.id },
      });

      res.json({ message: 'Your account has been deleted' });
    }
  )
);

// GET /users/:id — 특정 유저 조회
router.get(
  '/:id',
  validateParams(getUserParamsSchema),
  authenticateJWT,
  authorizeSelfOrAdmin('id'),
  asyncHandler(async (req, res: Response<User>) => {
    const { id } = req.params;

    const user = await prisma.user.findUnique({
      where: { id },
    });
    if (!user) {
      throw new UserNotFoundError({
        code: 400,
        message: 'User not found',
        logging: false,
      });
    }
    res.json(user);
  })
);

// PUT /users/:id — 유저 수정
router.put(
  '/:id',
  validateParams(getUserParamsSchema),
  validateBody(updateUserSchema),
  authenticateJWT,
  authorizeSelfOrAdmin('id'),
  asyncHandler(async (req: AuthenticatedRequest, res: Response<User>) => {
    const { id } = req.params;
    const { email, name, password } = req.body;

    const updateData: UserInput = {};
    if (email) updateData.email = email;
    if (name) updateData.name = name;
    if (password) updateData.password = await bcrypt.hash(password, 10);

    const user = await prisma.user.update({
      where: { id },
      data: updateData,
    });
    res.json(user);
  })
);

// DELETE /users/:id — 유저 삭제
router.delete(
  '/:id',
  validateParams(getUserParamsSchema),
  authenticateJWT,
  authorizeSelfOrAdmin('id'),
  asyncHandler(
    async (req: AuthenticatedRequest, res: Response<{ message: string }>) => {
      const { id } = req.params;

      await prisma.user.delete({ where: { id } });
      res.json({
        message: 'User deleted',
      });
    }
  )
);

export default router;
