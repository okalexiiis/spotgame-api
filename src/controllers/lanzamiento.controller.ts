import { Request, Response } from 'express';
import prisma from '../lib/prisma';

export const list = async (req: Request, res: Response) => {
  res.json(await prisma.proximoLanzamiento.findMany({
    include: { juego: { select: { titulo: true, slug: true } } },
    orderBy: { fechaLanzamiento: 'asc' },
  }));
};

export const getById = async (req: Request, res: Response) => {
  const lanzamiento = await prisma.proximoLanzamiento.findUnique({
    where: { idLanzamiento: req.params.id as string },
    include: { juego: true },
  });
  if (!lanzamiento) return res.status(404).json({ status: 'error', message: 'Release entry not found' });
  res.json(lanzamiento);
};

export const create = async (req: Request, res: Response) => {
  const data = req.body;
  if (data.fechaLanzamiento) data.fechaLanzamiento = new Date(data.fechaLanzamiento);
  res.status(201).json(await prisma.proximoLanzamiento.create({ data }));
};

export const update = async (req: Request, res: Response) => {
  const data = req.body;
  if (data.fechaLanzamiento) data.fechaLanzamiento = new Date(data.fechaLanzamiento);
  res.json(await prisma.proximoLanzamiento.update({ where: { idLanzamiento: req.params.id as string }, data }));
};

export const remove = async (req: Request, res: Response) => {
  await prisma.proximoLanzamiento.delete({ where: { idLanzamiento: req.params.id as string } });
  res.status(204).send();
};
