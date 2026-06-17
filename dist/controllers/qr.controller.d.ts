import { Request, Response } from 'express';
export declare const generate: (req: Request, res: Response) => Promise<void>;
export declare const approve: (req: Request, res: Response) => Promise<void>;
export declare const checkStatus: (req: Request, res: Response) => Promise<void>;
