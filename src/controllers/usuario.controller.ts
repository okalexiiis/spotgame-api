import { Request, Response } from 'express';
import prisma from '../lib/prisma';
import { paginate } from '../lib/pagination';

export const list = async (req: Request, res: Response) => {
  const { page, limit } = req.query as any;
  res.json(await paginate(prisma.usuario, {
    page, limit,
    select: { idUsuario: true, nombre: true, username: true, fechaRegistro: true, estado: true },
  }));
};

export const getById = async (req: Request, res: Response) => {
  if (!req.user!.roles.includes('Admin') && req.user!.idUsuario !== req.params.id) {
    res.status(403).json({ status: 'error', message: 'Forbidden' });
    return;
  }
  const usuario = await prisma.usuario.findUnique({
    where: { idUsuario: req.params.id as string },
    include: { roles: { include: { rol: true } } },
  });
  if (!usuario) return res.status(404).json({ status: 'error', message: 'User not found' });
  
  const { contrasenaHash: _contrasenaHash, ...rest } = usuario;
  res.json(rest);
};

export const addRol = async (req: Request, res: Response) => {
  await prisma.usuarioRol.upsert({
    where: { idUsuario_idRol: { idUsuario: req.params.id as string, idRol: req.body.idRol } },
    update: {},
    create: { idUsuario: req.params.id as string, idRol: req.body.idRol },
  });
  res.status(201).json({ status: 'success' });
};

export const removeRol = async (req: Request, res: Response) => {
  await prisma.usuarioRol.delete({
    where: { idUsuario_idRol: { idUsuario: req.params.id as string, idRol: req.body.idRol } },
  });
  res.status(204).send();
};
