import { Request, Response } from 'express';
export declare const listFavoritos: (req: Request, res: Response) => Promise<void>;
export declare const addFavorito: (req: Request, res: Response) => Promise<void>;
export declare const removeFavorito: (req: Request, res: Response) => Promise<void>;
export declare const listDescargas: (req: Request, res: Response) => Promise<void>;
export declare const logDescarga: (req: Request, res: Response) => Promise<void>;
export declare const listReservas: (req: Request, res: Response) => Promise<void>;
export declare const addReserva: (req: Request, res: Response) => Promise<void>;
export declare const removeReserva: (req: Request, res: Response) => Promise<void>;
