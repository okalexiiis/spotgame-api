import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

export const validate = (schema: { body?: z.ZodTypeAny; query?: z.ZodTypeAny; params?: z.ZodTypeAny }) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    if (schema.body) req.body = await schema.body.parseAsync(req.body);
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
  };
};
