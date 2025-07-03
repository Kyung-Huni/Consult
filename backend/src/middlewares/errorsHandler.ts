import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../errors/CustomError';
import { handlePrismaError } from '../utils/handlePrismaError';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Prisma 에러 → CustomError 로 변환
  try {
    handlePrismaError(err); // 이 안에서 throw CustomError
  } catch (e) {
    err = e as Error;
  }

  // Handled errors
  if (err instanceof CustomError) {
    const { statusCode, errors, logging } = err;
    if (logging) {
      console.error(
        JSON.stringify(
          {
            code: err.statusCode,
            errors: err.errors,
            stack: err.stack,
          },
          null,
          2
        )
      );
    }
    return res.status(statusCode).send({ errors });
  }

  // Unhandled errors
  console.error(
    JSON.stringify({ message: err.message, stack: err.stack }, null, 2)
  );
  res.status(500).send({ errors: [{ message: 'Something went wrong' }] });
};
