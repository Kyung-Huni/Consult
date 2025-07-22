import { Router, Request, Response } from 'express';
import { prisma } from '../prisma';
import { User } from '@prisma/client';

import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

// Middlewares
import { validateBody } from '../middlewares/validateBody';
import { getUserLoginSchema } from '../schemas/user/getUserLoginSchema';

// Utils
import { asyncHandler } from '../utils/asyncHandler';
import { generateTokens } from '../utils/generateTokens';

// Errors
import NotFoundError from '../errors/NotFoundError';
import EmailAlreadyExistsError from '../errors/EmailAlreadyExistsError';
import InvalidCredentailError from '../errors/InvalidCredentialError';
import EnvError from '../errors/EnvError';
import UnauthorizedError from '../errors/UnauthorizedError';

// Validation Schema
import {
  CreateUserInput,
  createUserSchema,
} from '../schemas/user/createUserSchema';
import {
  AuthenticatedRequest,
  authenticateJWT,
} from '../middlewares/authMiddleware';

interface LoginInput {
  email: string;
  password: string;
}

type SafeUser = Pick<User, 'id' | 'email' | 'name'>;

const router = Router();
dotenv.config();

router.post(
  '/login',
  validateBody(getUserLoginSchema),
  asyncHandler(
    async (
      req: Request<{}, {}, LoginInput>,
      res: Response<
        | { token: string; user: { id: string; email: string; name: string } }
        | { error: string }
      >
    ) => {
      const { email, password } = req.body;

      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) {
        throw new NotFoundError({ message: 'User not found' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        throw new InvalidCredentailError();
      }

      const { accessToken, refreshToken } = generateTokens(user);

      await prisma.user.update({
        where: { id: user.id },
        data: { refreshToken },
      });

      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        path: '/',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7일
      });

      const safeUser: SafeUser = {
        id: user.id,
        email: user.email,
        name: user.name,
      };

      res.json({ token: accessToken, user: safeUser });
    }
  )
);

router.post(
  '/register',
  validateBody(createUserSchema),
  asyncHandler(
    async (
      req: Request<{}, {}, CreateUserInput>,
      res: Response<{ token: string; user: SafeUser }>
    ) => {
      const { email, name, password } = req.body;

      const existingUser = await prisma.user.findUnique({
        where: { email },
      });
      if (existingUser) {
        throw new EmailAlreadyExistsError();
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await prisma.user.create({
        data: {
          email,
          name,
          password: hashedPassword,
        },
      });

      const { accessToken, refreshToken } = generateTokens(user);

      await prisma.user.update({
        where: { id: user.id },
        data: { refreshToken },
      });

      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        path: '/',
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      const safeUser: SafeUser = {
        id: user.id,
        email: user.email,
        name: user.name,
      };

      res.status(201).json({ token: accessToken, user: safeUser });
    }
  )
);

router.post(
  '/refresh',
  asyncHandler(async (req: Request, res: Response) => {
    const token = req.cookies.refreshToken;

    console.log('Refresh 요청 도착!', req.cookies); // 또는 req.headers

    if (!token) {
      throw new UnauthorizedError({ message: 'Refresh token missing' });
    }

    const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;
    if (!REFRESH_SECRET) {
      throw new EnvError({ message: 'JWT_REFRESH_SECRET missing' });
    }

    let payload;
    try {
      payload = jwt.verify(token, REFRESH_SECRET) as { id: string };
    } catch (err) {
      throw new UnauthorizedError({ message: 'Invalid refresh token' });
    }

    const user = await prisma.user.findUnique({ where: { id: payload.id } });
    if (!user) throw new NotFoundError({ message: 'User not found' });

    if (user.refreshToken !== token) {
      throw new InvalidCredentailError({
        message: 'Refresh token does not match',
      });
    }

    const accessToken = jwt.sign(
      {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
      process.env.JWT_SECRET!,
      { expiresIn: '15m' }
    );

    res.json({
      token: accessToken,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });
  })
);

router.post(
  '/logout',
  authenticateJWT,
  asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    if (!req.user) {
      throw new UnauthorizedError({ message: 'Unauthorized request' });
    }
    const userId = req.user.id;

    await prisma.user.update({
      where: { id: userId },
      data: { refreshToken: null },
    });

    res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      path: '/',
    });

    res.status(204).send();
  })
);

export default router;
