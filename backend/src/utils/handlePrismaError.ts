import { Prisma } from '@prisma/client';
import ValidationError from '../errors/ValidationError';
import UserNotFoundError from '../errors/UserNotFoundError';

export function handlePrismaError(error: unknown): never {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === 'P2002') {
      throw new ValidationError({
        message: 'Unique constraint failed',
        context: { code: error.code },
      });
    }
    if (error.code === 'P2025') {
      throw new UserNotFoundError({
        message: 'Record not found',
        context: { code: error.code },
      });
    }
  }

  throw error;
}
