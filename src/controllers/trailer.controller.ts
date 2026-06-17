import { Request, Response } from 'express';
import prisma from '../lib/prisma';

export const list = async (req: Request, res: Response) => {
  res.json(await prisma.trailer.findMany({
    orderBy: { createdAt: 'desc' },
    include: { juego: { select: { titulo: true } } },
  }));
};

export const getById = async (req: Request, res: Response) => {
  const trailer = await prisma.trailer.findUnique({
    where: { idTrailer: req.params.id as string },
    include: { juego: { select: { titulo: true } } },
  });
  if (!trailer) return res.status(404).json({ status: 'error', message: 'Trailer not found' });
  res.json(trailer);
};

export const create = async (req: Request, res: Response) => {
  const data = req.body;
  if (!data.subidoPor && req.user) data.subidoPor = req.user.idUsuario;
  res.status(201).json(await prisma.trailer.create({ data }));
};

export const update = async (req: Request, res: Response) => {
  res.json(await prisma.trailer.update({
    where: { idTrailer: req.params.id as string },
    data: req.body,
  }));
};

export const remove = async (req: Request, res: Response) => {
  await prisma.trailer.delete({ where: { idTrailer: req.params.id as string } });
  res.status(204).send();
};

export const addCategoria = async (req: Request, res: Response) => {
  const { idCategoria } = req.body;
  await prisma.trailerCategoria.upsert({
    where: { idTrailer_idCategoria: { idTrailer: req.params.id as string, idCategoria } },
    update: {},
    create: { idTrailer: req.params.id as string, idCategoria },
  });
  res.status(201).json({ status: 'success' });
};

export const removeCategoria = async (req: Request, res: Response) => {
  await prisma.trailerCategoria.delete({
    where: { idTrailer_idCategoria: { idTrailer: req.params.id as string, idCategoria: req.body.idCategoria } },
  });
  res.status(204).send();
};
