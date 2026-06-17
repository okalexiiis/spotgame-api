import { Request, Response } from 'express';
import prisma from '../lib/prisma';

export const listMine = async (req: Request, res: Response) => {
  try {
    const logs = await prisma.logActividad.findMany({
      where: { idUsuario: req.user!.idUsuario },
      orderBy: { fecha: 'desc' },
      take: 50,
    });
    res.json(logs);
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
};
