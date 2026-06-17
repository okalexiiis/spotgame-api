import { Request, Response } from 'express';
export declare const list: (req: Request, res: Response) => Promise<void>;
export declare const getById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const addRol: (req: Request, res: Response) => Promise<void>;
export declare const removeRol: (req: Request, res: Response) => Promise<void>;
