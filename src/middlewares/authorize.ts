import { Request, Response, NextFunction } from 'express';

export const ADMIN_ROLES = ['Admin', 'Moderador'];

export const authorize = (...allowed: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      res.status(401).json({ status: 'error', message: 'Unauthorized' });
      return;
    }
    if (allowed.length === 0) return next();
    const hasRole = allowed.some((role) => req.user!.roles.includes(role));
    if (!hasRole) {
      res.status(403).json({ status: 'error', message: 'Forbidden' });
      return;
    }
    next();
  };
};
