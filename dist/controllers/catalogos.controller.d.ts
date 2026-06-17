import { Request, Response } from 'express';
export declare const createList: (model: any) => (req: Request, res: Response) => Promise<void>;
export declare const createGetById: (model: any, idField: string) => (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const createCreate: (model: any) => (req: Request, res: Response) => Promise<void>;
export declare const createUpdate: (model: any, idField: string) => (req: Request, res: Response) => Promise<void>;
export declare const createRemove: (model: any, idField: string) => (req: Request, res: Response) => Promise<void>;
