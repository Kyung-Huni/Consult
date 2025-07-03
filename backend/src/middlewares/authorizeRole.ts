import { NextFunction, Response } from 'express';
import { AuthenticatedRequest } from './authMiddleware';
import PermissionDeniedError from '../errors/PermissionDeniedError';

export const authorizeRole = (requiredRole: string) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (req.user?.role !== requiredRole) {
      throw new PermissionDeniedError();
    }
    next();
  };
};
