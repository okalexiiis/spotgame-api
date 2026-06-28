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
      include: { usuario: { include: { roles: { include: { rol: true } } } } },
    });

    if (!sesion || !sesion.activa || (sesion.fechaFin && sesion.fechaFin < new Date())) {
      res.status(401).json({ status: 'error', message: 'Unauthorized' });
      return;
    }

    const { contrasenaHash: _contrasenaHash, ...safeUser } = sesion.usuario;
    req.user = {
      ...safeUser,
      roles: sesion.usuario.roles.map((ur) => ur.rol.nombre),
    };
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
};
