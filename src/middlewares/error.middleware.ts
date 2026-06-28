import { Request, Response, NextFunction } from 'express';
import { Prisma } from '@prisma/client';
import { ZodError } from 'zod';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  if (res.headersSent) return next(err);

  // Prisma Errors
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === 'P2002') {
      return res.status(409).json({
        status: 'error',
        message: 'A record with this value already exists (Unique constraint failed)',
        target: err.meta?.target,
      });
    }
    if (err.code === 'P2025') {
      return res.status(404).json({
        status: 'error',
        message: 'Record not found',
      });
    }
  }

  if (err instanceof Prisma.PrismaClientValidationError) {
    return res.status(400).json({ status: 'error', message: 'Validation error' });
  }

  if (err instanceof ZodError) {
    return res.status(400).json({
      status: 'error',
      message: 'Validation error',
      errors: err.issues.map((issue) => ({ path: issue.path.join('.'), message: issue.message })),
    });
  }

  // Generic/Unexpected Errors
  console.error(`[Error] ${req.method} ${req.path}:`, err.message || err);
  if (process.env.NODE_ENV !== 'production' && err.stack) console.error(err.stack);

  res.status(err.status || 500).json({
    status: 'error',
    message: process.env.NODE_ENV !== 'production' ? (err.message || 'Internal server error') : 'Internal server error',
  });
};
