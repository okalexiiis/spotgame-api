import { Request, Response } from 'express';
import prisma from '../lib/prisma';
import { Prisma } from '@prisma/client';

export const list = async (req: Request, res: Response) => {
  const { page, limit, search } = req.query as any;
  const skip = (page - 1) * limit;

  const where: Prisma.NoticiaWhereInput = search
    ? {
        OR: [
          { titulo: { contains: search, mode: 'insensitive' } },
          { resumen: { contains: search, mode: 'insensitive' } },
        ],
      }
    : {};

  const [total, data] = await prisma.$transaction([
    prisma.noticia.count({ where }),
    prisma.noticia.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
      include: { autor: { select: { nombre: true, username: true } } },
    }),
  ]);

  res.json({
    data,
    meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
  });
};

export const getById = async (req: Request, res: Response) => {
  const noticia = await prisma.noticia.findUnique({
    where: { idNoticia: req.params.id as string },
    include: { autor: { select: { nombre: true, username: true } }, imagenes: true },
  });
  if (!noticia) return res.status(404).json({ status: 'error', message: 'News not found' });
  res.json(noticia);
};

export const create = async (req: Request, res: Response) => {
  const payload = {
    ...req.body,
    fechaPublicacion: req.body.fechaPublicacion ? new Date(req.body.fechaPublicacion) : undefined,
    autorId: req.body.autorId || req.user!.idUsuario,
  };
  res.status(201).json(await prisma.noticia.create({ data: payload }));
};

export const update = async (req: Request, res: Response) => {
  const payload = { ...req.body, fechaPublicacion: req.body.fechaPublicacion ? new Date(req.body.fechaPublicacion) : undefined };
  res.json(await prisma.noticia.update({ where: { idNoticia: req.params.id as string }, data: payload }));
};

export const remove = async (req: Request, res: Response) => {
  await prisma.noticia.delete({ where: { idNoticia: req.params.id as string } });
  res.status(204).send();
};

export const addImagen = async (req: Request, res: Response) => {
  res.status(201).json(await prisma.imagenNoticia.create({
    data: { ...req.body, idNoticia: req.params.id as string },
  }));
};

export const removeImagen = async (req: Request, res: Response) => {
  await prisma.imagenNoticia.delete({ where: { id: req.params.idImagen as string } });
  res.status(204).send();
};
