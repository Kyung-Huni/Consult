import { Request, Response, NextFunction } from 'express';
import { AnySchema } from 'yup';
import { validateRequest } from '../utils/validateRequest';

export function validateParams(schema: AnySchema) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      req.params = await validateRequest(schema, req.params);
      next();
    } catch (err) {
      next(err);
    }
  };
}
