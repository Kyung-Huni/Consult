import { Request, Response, NextFunction } from 'express';
import { AnySchema } from 'yup';
import { validateRequest } from '../utils/validateRequest';

export function validateBody(schema: AnySchema) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = await validateRequest(schema, req.body);
      next();
    } catch (err) {
      next(err);
    }
  };
}
