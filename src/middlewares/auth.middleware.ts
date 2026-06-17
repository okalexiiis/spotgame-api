import { Request, Response, NextFunction } from 'express';
import prisma from '../lib/prisma';

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ status: 'error', message: 'Unauthorized' });
    return;
  }

  const token = authHeader.split(' ')[1];

  try {
    const sesion = await prisma.sesion.findUnique({
      where: { token },
      include: { usuario: true },
    });

    if (!sesion || !sesion.activa || (sesion.fechaFin && sesion.fechaFin < new Date())) {
      res.status(401).json({ status: 'error', message: 'Unauthorized' });
      return;
    }

    req.user = sesion.usuario;
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
};
