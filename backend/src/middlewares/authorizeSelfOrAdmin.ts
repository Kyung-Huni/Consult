import { NextFunction, Response } from 'express';
import { AuthenticatedRequest } from './authMiddleware';
import PermissionDeniedError from '../errors/PermissionDeniedError';

export const authorizeSelfOrAdmin = (paramKey: string = 'id') => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const user = req.user;
    const paramValue = req.params[paramKey];

    if (!user) {
      throw new PermissionDeniedError({ message: 'Unauthorized access' });
    }

    const isSelf = user.id === paramValue;
    const isAdmin = user.role === 'ADMIN';

    if (!isSelf && !isAdmin) {
      throw new PermissionDeniedError({ message: 'Access denied' });
    }

    next();
  };
};
