"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.markAllAsRead = exports.markAsRead = exports.listMine = void 0;
const prisma_1 = __importDefault(require("../lib/prisma"));
const listMine = async (req, res) => {
    try {
        const notificaciones = await prisma_1.default.notificacion.findMany({
            where: { idUsuario: req.user.idUsuario },
            orderBy: { fechaCreacion: 'desc' },
        });
        res.json(notificaciones);
    }
    catch (error) {
        res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
};
exports.listMine = listMine;
const markAsRead = async (req, res) => {
    const id = req.params.id;
    try {
        await prisma_1.default.notificacion.update({
            where: { idNotificacion: id, idUsuario: req.user.idUsuario },
            data: { leida: true, fechaLectura: new Date() },
        });
        res.json({ status: 'success' });
    }
    catch (error) {
        res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
};
exports.markAsRead = markAsRead;
const markAllAsRead = async (req, res) => {
    try {
        await prisma_1.default.notificacion.updateMany({
            where: { idUsuario: req.user.idUsuario, leida: false },
            data: { leida: true, fechaLectura: new Date() },
        });
        res.json({ status: 'success' });
    }
    catch (error) {
        res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
};
exports.markAllAsRead = markAllAsRead;
//# sourceMappingURL=notificacion.controller.js.map