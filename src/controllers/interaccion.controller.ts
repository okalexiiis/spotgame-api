import { Request, Response } from 'express';
import prisma from '../lib/prisma';

// Favorites
export const listFavoritos = async (req: Request, res: Response) => {
  try {
    const favoritos = await prisma.favorito.findMany({
      where: { idUsuario: req.user!.idUsuario },
      include: { juego: true },
    });
    res.json(favoritos);
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
};

export const addFavorito = async (req: Request, res: Response) => {
  const { idJuego } = req.body;
  try {
    const favorito = await prisma.favorito.upsert({
      where: { idUsuario_idJuego: { idUsuario: req.user!.idUsuario, idJuego } },
      update: {},
      create: { idUsuario: req.user!.idUsuario, idJuego },
    });
    res.status(201).json(favorito);
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
};

export const removeFavorito = async (req: Request, res: Response) => {
  const idJuego = req.params.idJuego as string;
  try {
    await prisma.favorito.delete({
      where: { idUsuario_idJuego: { idUsuario: req.user!.idUsuario, idJuego } },
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
};

// Downloads
export const listDescargas = async (req: Request, res: Response) => {
  try {
    const descargas = await prisma.descarga.findMany({
      where: { idUsuario: req.user!.idUsuario },
      include: { juego: true },
      orderBy: { fechaDescarga: 'desc' },
    });
    res.json(descargas);
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
};

export const logDescarga = async (req: Request, res: Response) => {
  const { idJuego, plataforma } = req.body;
  try {
    const descarga = await prisma.descarga.create({
      data: { idUsuario: req.user!.idUsuario, idJuego, plataforma },
    });
    res.status(201).json(descarga);
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
};

// Reservations
export const listReservas = async (req: Request, res: Response) => {
  try {
    const reservas = await prisma.reserva.findMany({
      where: { idUsuario: req.user!.idUsuario },
      include: { lanzamiento: { include: { juego: true } } },
    });
    res.json(reservas);
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
};

export const addReserva = async (req: Request, res: Response) => {
  const { idLanzamiento } = req.body;
  try {
    const reserva = await prisma.reserva.upsert({
      where: { idUsuario_idLanzamiento: { idUsuario: req.user!.idUsuario, idLanzamiento } },
      update: {},
      create: { idUsuario: req.user!.idUsuario, idLanzamiento },
    });
    res.status(201).json(reserva);
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
};

export const removeReserva = async (req: Request, res: Response) => {
  const idLanzamiento = req.params.idLanzamiento as string;
  try {
    await prisma.reserva.delete({
      where: { idUsuario_idLanzamiento: { idUsuario: req.user!.idUsuario, idLanzamiento } },
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
};
