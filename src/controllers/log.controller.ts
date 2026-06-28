import { Request, Response } from 'express';
import prisma from '../lib/prisma';
import { paginate } from '../lib/pagination';

export const listMine = async (req: Request, res: Response) => {
  const { page, limit } = req.query as any;
  res.json(await paginate(prisma.logActividad, {
    page, limit,
    where: { idUsuario: req.user!.idUsuario },
    orderBy: { fecha: 'desc' },
  }));
};
