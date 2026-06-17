import { Request, Response } from 'express';

export const createList = (model: any) => async (req: Request, res: Response) => {
  res.json(await model.findMany());
};

export const createGetById = (model: any, idField: string) => async (req: Request, res: Response) => {
  const item = await model.findUnique({ where: { [idField]: req.params.id } });
  if (!item) return res.status(404).json({ status: 'error', message: 'Item not found' });
  res.json(item);
};

export const createCreate = (model: any) => async (req: Request, res: Response) => {
  res.status(201).json(await model.create({ data: req.body }));
};

export const createUpdate = (model: any, idField: string) => async (req: Request, res: Response) => {
  res.json(await model.update({ where: { [idField]: req.params.id }, data: req.body }));
};

export const createRemove = (model: any, idField: string) => async (req: Request, res: Response) => {
  await model.delete({ where: { [idField]: req.params.id } });
  res.status(204).send();
};
