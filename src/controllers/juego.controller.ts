import { Request, Response } from 'express';
import prisma from '../lib/prisma';
import { Prisma } from '@prisma/client';

export const list = async (req: Request, res: Response) => {
  const { page, limit, search, generoId, plataformaId } = req.query as any;
  const skip = (page - 1) * limit;

  const where: Prisma.JuegoWhereInput = {
    AND: [
      search ? { titulo: { contains: search, mode: 'insensitive' } } : {},
      generoId ? { generos: { some: { idGenero: generoId } } } : {},
      plataformaId ? { plataformas: { some: { idPlataforma: plataformaId } } } : {},
    ],
  };

  const [total, data] = await prisma.$transaction([
    prisma.juego.count({ where }),
    prisma.juego.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
      include: { generos: { include: { genero: true } }, plataformas: { include: { plataforma: true } } },
    }),
  ]);

  res.json({
    data,
    meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
  });
};

export const getById = async (req: Request, res: Response) => {
  const juego = await prisma.juego.findUnique({ where: { idJuego: req.params.id as string } });
  if (!juego) return res.status(404).json({ status: 'error', message: 'Game not found' });
  res.json(juego);
};

export const create = async (req: Request, res: Response) => {
  const payload = { ...req.body, fechaLanzamiento: req.body.fechaLanzamiento ? new Date(req.body.fechaLanzamiento) : undefined };
  res.status(201).json(await prisma.juego.create({ data: payload }));
};

export const update = async (req: Request, res: Response) => {
  const payload = { ...req.body, fechaLanzamiento: req.body.fechaLanzamiento ? new Date(req.body.fechaLanzamiento) : undefined };
  res.json(await prisma.juego.update({
    where: { idJuego: req.params.id as string },
    data: payload,
  }));
};

export const remove = async (req: Request, res: Response) => {
  await prisma.juego.delete({ where: { idJuego: req.params.id as string } });
  res.status(204).send();
};

export const addGenero = async (req: Request, res: Response) => {
  const { idGenero } = req.body;
  await prisma.juegoGenero.upsert({
    where: { idJuego_idGenero: { idJuego: req.params.id as string, idGenero } },
    update: {},
    create: { idJuego: req.params.id as string, idGenero },
  });
  res.status(201).json({ status: 'success' });
};

export const removeGenero = async (req: Request, res: Response) => {
  const { idGenero } = req.body;
  await prisma.juegoGenero.delete({
    where: { idJuego_idGenero: { idJuego: req.params.id as string, idGenero: idGenero } },
  });
  res.status(204).send();
};

export const addPlataforma = async (req: Request, res: Response) => {
  const { idPlataforma } = req.body;
  await prisma.juegoPlataforma.upsert({
    where: { idJuego_idPlataforma: { idJuego: req.params.id as string, idPlataforma } },
    update: {},
    create: { idJuego: req.params.id as string, idPlataforma },
  });
  res.status(201).json({ status: 'success' });
};

export const removePlataforma = async (req: Request, res: Response) => {
  const { idPlataforma } = req.body;
  await prisma.juegoPlataforma.delete({
    where: { idJuego_idPlataforma: { idJuego: req.params.id as string, idPlataforma: idPlataforma } },
  });
  res.status(204).send();
};
