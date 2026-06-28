import { Request, Response } from 'express';
import prisma from '../lib/prisma';

export const getMine = async (req: Request, res: Response) => {
  const idUsuario = req.user!.idUsuario;
  const config = await prisma.configuracionUsuario.findUnique({
    where: { idUsuario },
  });
  res.json(config || {});
};

export const updateMine = async (req: Request, res: Response) => {
  const idUsuario = req.user!.idUsuario;
  const config = await prisma.configuracionUsuario.upsert({
    where: { idUsuario },
    update: req.body,
    create: { ...req.body, idUsuario },
  });
  res.json(config);
};
