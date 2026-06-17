import { Request, Response } from 'express';
import prisma from '../lib/prisma';
import crypto from 'crypto';

export const generate = async (req: Request, res: Response) => {
  const codigo = crypto.randomBytes(4).toString('hex').toUpperCase();
  const expiraEn = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

  try {
    const qr = await prisma.qrLogin.create({
      data: { codigo, expiraEn },
    });
    res.status(201).json(qr);
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
};

export const approve = async (req: Request, res: Response) => {
  const { codigo } = req.body;
  const idUsuario = req.user!.idUsuario;

  try {
    const qr = await prisma.qrLogin.findUnique({ where: { codigo } });

    if (!qr || qr.estado !== 'pendiente' || qr.expiraEn < new Date()) {
      res.status(404).json({ status: 'error', message: 'Invalid or expired code' });
      return;
    }

    await prisma.qrLogin.update({
      where: { codigo },
      data: { estado: 'aprobado', idUsuario },
    });

    res.json({ status: 'success', message: 'Code approved' });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
};

export const checkStatus = async (req: Request, res: Response) => {
  const codigo = req.params.codigo as string;

  try {
    const qr = await prisma.qrLogin.findUnique({
      where: { codigo },
      include: { usuario: true },
    });

    if (!qr) {
      res.status(404).json({ status: 'error', message: 'Code not found' });
      return;
    }

    if (qr.estado === 'aprobado' && qr.idUsuario) {
      // In a real app, generate a new session token here
      const session = await prisma.sesion.create({
        data: {
          idUsuario: qr.idUsuario,
          token: crypto.randomBytes(32).toString('hex'),
        },
      });
      res.json({ estado: 'aprobado', token: session.token });
      return;
    }

    if (qr.expiraEn < new Date()) {
      res.json({ estado: 'expirado', token: null });
      return;
    }

    res.json({ estado: qr.estado, token: null });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
};
