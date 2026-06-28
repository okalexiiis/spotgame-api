import { Request, Response } from 'express';

interface PrismaDelegate {
  findMany: (...args: any[]) => Promise<any[]>;
  findUnique: (...args: any[]) => Promise<any>;
  create: (...args: any[]) => Promise<any>;
  update: (...args: any[]) => Promise<any>;
  delete: (...args: any[]) => Promise<any>;
}

export const createList = (model: PrismaDelegate) => async (req: Request, res: Response) => {
  res.json(await model.findMany());
};

export const createGetById = (model: PrismaDelegate, idField: string) => async (req: Request, res: Response) => {
  const item = await model.findUnique({ where: { [idField]: req.params.id } });
  if (!item) return res.status(404).json({ status: 'error', message: 'Item not found' });
  res.json(item);
};

export const createCreate = (model: PrismaDelegate) => async (req: Request, res: Response) => {
  res.status(201).json(await model.create({ data: req.body }));
};

export const createUpdate = (model: PrismaDelegate, idField: string) => async (req: Request, res: Response) => {
  res.json(await model.update({ where: { [idField]: req.params.id }, data: req.body }));
};

export const createRemove = (model: PrismaDelegate, idField: string) => async (req: Request, res: Response) => {
  await model.delete({ where: { [idField]: req.params.id } });
  res.status(204).send();
};
