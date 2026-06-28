import { Request, Response } from 'express';
import prisma from '../lib/prisma';
import { paginate } from '../lib/pagination';

export const list = async (req: Request, res: Response) => {
  const { page, limit } = req.query as any;
  res.json(await paginate(prisma.proximoLanzamiento, {
    page, limit,
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
  const payload = { ...req.body, fechaLanzamiento: req.body.fechaLanzamiento ? new Date(req.body.fechaLanzamiento) : undefined };
  res.status(201).json(await prisma.proximoLanzamiento.create({ data: payload }));
};

export const update = async (req: Request, res: Response) => {
  const payload = { ...req.body, fechaLanzamiento: req.body.fechaLanzamiento ? new Date(req.body.fechaLanzamiento) : undefined };
  res.json(await prisma.proximoLanzamiento.update({ where: { idLanzamiento: req.params.id as string }, data: payload }));
};

export const remove = async (req: Request, res: Response) => {
  await prisma.proximoLanzamiento.delete({ where: { idLanzamiento: req.params.id as string } });
  res.status(204).send();
};
