import { Request, Response } from 'express';
import prisma from '../lib/prisma';

export const listMine = async (req: Request, res: Response) => {
  try {
    const notificaciones = await prisma.notificacion.findMany({
      where: { idUsuario: req.user!.idUsuario },
      orderBy: { fechaCreacion: 'desc' },
    });
    res.json(notificaciones);
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
};

export const markAsRead = async (req: Request, res: Response) => {
  const id = req.params.id as string;
  try {
    await prisma.notificacion.update({
      where: { idNotificacion: id, idUsuario: req.user!.idUsuario },
      data: { leida: true, fechaLectura: new Date() },
    });
    res.json({ status: 'success' });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
};

export const markAllAsRead = async (req: Request, res: Response) => {
  try {
    await prisma.notificacion.updateMany({
      where: { idUsuario: req.user!.idUsuario, leida: false },
      data: { leida: true, fechaLectura: new Date() },
    });
    res.json({ status: 'success' });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
};
