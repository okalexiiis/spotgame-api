import { Request, Response } from 'express';
import prisma from '../lib/prisma';
import { paginate } from '../lib/pagination';

export const listMine = async (req: Request, res: Response) => {
  const { page, limit } = req.query as any;
  res.json(await paginate(prisma.notificacion, {
    page, limit,
    where: { idUsuario: req.user!.idUsuario },
    orderBy: { fechaCreacion: 'desc' },
  }));
};

export const markAsRead = async (req: Request, res: Response) => {
  const id = req.params.id as string;
  await prisma.notificacion.update({
    where: { idNotificacion: id, idUsuario: req.user!.idUsuario },
    data: { leida: true, fechaLectura: new Date() },
  });
  res.json({ status: 'success' });
};

export const markAllAsRead = async (req: Request, res: Response) => {
  await prisma.notificacion.updateMany({
    where: { idUsuario: req.user!.idUsuario, leida: false },
    data: { leida: true, fechaLectura: new Date() },
  });
  res.json({ status: 'success' });
};
