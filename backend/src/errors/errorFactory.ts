import * as yup from 'yup';
import ValidationError from './ValidationError';
import { CustomError } from './CustomError';

export function createError(error: unknown): CustomError {
  if (error instanceof yup.ValidationError) {
    const context = error.inner.map((err) => ({
      field: err.path,
      rejectedValue: err.value,
      message: err.message,
    }));

    return new ValidationError({
      message: '입력값이 유효하지 않습니다',
      context,
      logging: false,
    });
  }

  return new ValidationError({
    message: '알 수 없는 에러가 발생했습니다.',
    context: { originalMessage: (error as Error).message },
    logging: true,
  });
}
