import { AnySchema } from 'yup';
import ValidationError from '../errors/ValidationError';

export async function validateRequest<T>(
  schema: AnySchema,
  data: unknown
): Promise<T> {
  try {
    return await schema.validate(data, {
      abortEarly: false,
      stripUnknown: true,
    });
  } catch (err: any) {
    throw new ValidationError({
      message: 'Invalid request data',
      context: {
        errors:
          err.inner?.map((e: any) => ({
            path: e.path,
            message: e.message,
          })) || [],
      },
    });
  }
}
