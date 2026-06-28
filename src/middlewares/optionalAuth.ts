import { Request, Response, NextFunction } from 'express';
import prisma from '../lib/prisma';

// ponytail: same as authenticate but silently passes when no/invalid token.
// Needed for public endpoints (trailer.list) that benefit from role awareness
// without requiring auth.
export const optionalAuth = async (req: Request, _res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) return next();

  const token = authHeader.split(' ')[1];
  try {
    const sesion = await prisma.sesion.findUnique({
      where: { token },
      include: { usuario: { include: { roles: { include: { rol: true } } } } },
    });
    if (!sesion?.activa || (sesion.fechaFin && sesion.fechaFin < new Date())) return next();

    const { contrasenaHash: _contrasenaHash, ...safeUser } = sesion.usuario;
    req.user = {
      ...safeUser,
      roles: sesion.usuario.roles.map((ur) => ur.rol.nombre),
    };
    next();
  } catch {
    next();
  }
};
