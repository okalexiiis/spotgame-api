"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeReserva = exports.addReserva = exports.listReservas = exports.logDescarga = exports.listDescargas = exports.removeFavorito = exports.addFavorito = exports.listFavoritos = void 0;
const prisma_1 = __importDefault(require("../lib/prisma"));
const listFavoritos = async (req, res) => {
    try {
        const favoritos = await prisma_1.default.favorito.findMany({
            where: { idUsuario: req.user.idUsuario },
            include: { juego: true },
        });
        res.json(favoritos);
    }
    catch (error) {
        res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
};
exports.listFavoritos = listFavoritos;
const addFavorito = async (req, res) => {
    const { idJuego } = req.body;
    try {
        const favorito = await prisma_1.default.favorito.upsert({
            where: { idUsuario_idJuego: { idUsuario: req.user.idUsuario, idJuego } },
            update: {},
            create: { idUsuario: req.user.idUsuario, idJuego },
        });
        res.status(201).json(favorito);
    }
    catch (error) {
        res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
};
exports.addFavorito = addFavorito;
const removeFavorito = async (req, res) => {
    const idJuego = req.params.idJuego;
    try {
        await prisma_1.default.favorito.delete({
            where: { idUsuario_idJuego: { idUsuario: req.user.idUsuario, idJuego } },
        });
        res.status(204).send();
    }
    catch (error) {
        res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
};
exports.removeFavorito = removeFavorito;
const listDescargas = async (req, res) => {
    try {
        const descargas = await prisma_1.default.descarga.findMany({
            where: { idUsuario: req.user.idUsuario },
            include: { juego: true },
            orderBy: { fechaDescarga: 'desc' },
        });
        res.json(descargas);
    }
    catch (error) {
        res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
};
exports.listDescargas = listDescargas;
const logDescarga = async (req, res) => {
    const { idJuego, plataforma } = req.body;
    try {
        const descarga = await prisma_1.default.descarga.create({
            data: { idUsuario: req.user.idUsuario, idJuego, plataforma },
        });
        res.status(201).json(descarga);
    }
    catch (error) {
        res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
};
exports.logDescarga = logDescarga;
const listReservas = async (req, res) => {
    try {
        const reservas = await prisma_1.default.reserva.findMany({
            where: { idUsuario: req.user.idUsuario },
            include: { lanzamiento: { include: { juego: true } } },
        });
        res.json(reservas);
    }
    catch (error) {
        res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
};
exports.listReservas = listReservas;
const addReserva = async (req, res) => {
    const { idLanzamiento } = req.body;
    try {
        const reserva = await prisma_1.default.reserva.upsert({
            where: { idUsuario_idLanzamiento: { idUsuario: req.user.idUsuario, idLanzamiento } },
            update: {},
            create: { idUsuario: req.user.idUsuario, idLanzamiento },
        });
        res.status(201).json(reserva);
    }
    catch (error) {
        res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
};
exports.addReserva = addReserva;
const removeReserva = async (req, res) => {
    const idLanzamiento = req.params.idLanzamiento;
    try {
        await prisma_1.default.reserva.delete({
            where: { idUsuario_idLanzamiento: { idUsuario: req.user.idUsuario, idLanzamiento } },
        });
        res.status(204).send();
    }
    catch (error) {
        res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
};
exports.removeReserva = removeReserva;
//# sourceMappingURL=interaccion.controller.js.map