import { Request, Response } from 'express';
import prisma from '../lib/prisma';
import { hashPassword, comparePassword, generateToken } from '../lib/crypto';

export const register = async (req: Request, res: Response) => {
  const { nombre, username, correo, contrasena } = req.body;
  const existingUser = await prisma.usuario.findFirst({
    where: { OR: [{ correo }, { username }] },
  });

  if (existingUser) return res.status(400).json({ status: 'error', message: 'User already exists' });

  const hashedPassword = await hashPassword(contrasena);
  const usuario = await prisma.usuario.create({
    data: { nombre, username, correo, contrasenaHash: hashedPassword },
  });

  const token = generateToken();
  await prisma.sesion.create({ data: { idUsuario: usuario.idUsuario, token } });

  res.status(201).json({ token, usuario: { idUsuario: usuario.idUsuario, nombre: usuario.nombre, username: usuario.username, correo: usuario.correo } });
};

export const login = async (req: Request, res: Response) => {
  const { username, contrasena } = req.body;
  const usuario = await prisma.usuario.findUnique({ where: { username } });

  if (!usuario || !(await comparePassword(contrasena, usuario.contrasenaHash))) {
    return res.status(401).json({ status: 'error', message: 'Invalid credentials' });
  }

  const token = generateToken();
  await prisma.sesion.create({ data: { idUsuario: usuario.idUsuario, token } });

  res.status(200).json({ token, usuario: { idUsuario: usuario.idUsuario, nombre: usuario.nombre, username: usuario.username, correo: usuario.correo } });
};

export const logout = async (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(' ')[1];

  if (!token) return res.status(400).json({ status: 'error', message: 'No token provided' });

  await prisma.sesion.updateMany({
    where: { token, activa: true },
    data: { activa: false, fechaFin: new Date() },
  });

  res.status(200).json({ status: 'success', message: 'Logged out' });
};
