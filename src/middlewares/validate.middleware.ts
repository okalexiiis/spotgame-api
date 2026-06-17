import { Request, Response, NextFunction } from 'express';
import { z, ZodError } from 'zod';

export const validate = (schema: { body?: z.ZodObject<any>; query?: z.ZodObject<any>; params?: z.ZodObject<any> }) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (schema.body) {
        req.body = await schema.body.parseAsync(req.body);
      }
      if (schema.query) {
        // ponytail: Express 5.x makes req.query a getter-only property. 
        // We use defineProperty to shadow it with validated/coerced data.
        const parsed = await schema.query.parseAsync(req.query);
        Object.defineProperty(req, 'query', {
          value: parsed,
          writable: true,
          enumerable: true,
          configurable: true,
        });
      }
      if (schema.params) {
        // ponytail: Same shadowing for req.params for consistency and future-proofing.
        const parsed = await schema.params.parseAsync(req.params);
        Object.defineProperty(req, 'params', {
          value: parsed,
          writable: true,
          enumerable: true,
          configurable: true,
        });
      }
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({
          status: 'error',
          message: 'Validation failed',
          errors: error.issues.map((e) => ({
            path: e.path.join('.'),
            message: e.message,
          })),
        });
        return;
      }
      console.error('Validation Middleware Error:', error);
      res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
  };
};
