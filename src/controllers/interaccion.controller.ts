import { Request, Response } from 'express';
import prisma from '../lib/prisma';
import { paginate } from '../lib/pagination';

// Favorites
export const listFavoritos = async (req: Request, res: Response) => {
  const { page, limit } = req.query as any;
  res.json(await paginate(prisma.favorito, {
    page, limit,
    where: { idUsuario: req.user!.idUsuario },
    include: { juego: true },
  }));
};

export const addFavorito = async (req: Request, res: Response) => {
  const { idJuego } = req.body;
  const favorito = await prisma.favorito.upsert({
    where: { idUsuario_idJuego: { idUsuario: req.user!.idUsuario, idJuego } },
    update: {},
    create: { idUsuario: req.user!.idUsuario, idJuego },
  });
  res.status(201).json(favorito);
};

export const removeFavorito = async (req: Request, res: Response) => {
  const idJuego = req.params.idJuego as string;
  await prisma.favorito.delete({
    where: { idUsuario_idJuego: { idUsuario: req.user!.idUsuario, idJuego } },
  });
  res.status(204).send();
};

// Downloads
export const listDescargas = async (req: Request, res: Response) => {
  const { page, limit } = req.query as any;
  res.json(await paginate(prisma.descarga, {
    page, limit,
    where: { idUsuario: req.user!.idUsuario },
    include: { juego: true },
    orderBy: { fechaDescarga: 'desc' },
  }));
};

export const logDescarga = async (req: Request, res: Response) => {
  const { idJuego, plataforma } = req.body;
  const descarga = await prisma.descarga.create({
    data: { idUsuario: req.user!.idUsuario, idJuego, plataforma },
  });
  res.status(201).json(descarga);
};

// Reservations
export const listReservas = async (req: Request, res: Response) => {
  const { page, limit } = req.query as any;
  res.json(await paginate(prisma.reserva, {
    page, limit,
    where: { idUsuario: req.user!.idUsuario },
    include: { lanzamiento: { include: { juego: true } } },
  }));
};

export const addReserva = async (req: Request, res: Response) => {
  const { idLanzamiento } = req.body;
  const reserva = await prisma.reserva.upsert({
    where: { idUsuario_idLanzamiento: { idUsuario: req.user!.idUsuario, idLanzamiento } },
    update: {},
    create: { idUsuario: req.user!.idUsuario, idLanzamiento },
  });
  res.status(201).json(reserva);
};

export const removeReserva = async (req: Request, res: Response) => {
  const idLanzamiento = req.params.idLanzamiento as string;
  await prisma.reserva.delete({
    where: { idUsuario_idLanzamiento: { idUsuario: req.user!.idUsuario, idLanzamiento } },
  });
  res.status(204).send();
};
