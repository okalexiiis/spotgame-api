import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
export declare const validate: (schema: {
    body?: z.ZodObject<any>;
    query?: z.ZodObject<any>;
    params?: z.ZodObject<any>;
}) => (req: Request, res: Response, next: NextFunction) => Promise<void>;
