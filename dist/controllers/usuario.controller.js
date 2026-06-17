"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeRol = exports.addRol = exports.getById = exports.list = void 0;
const prisma_1 = __importDefault(require("../lib/prisma"));
const list = async (req, res) => {
    res.json(await prisma_1.default.usuario.findMany({
        select: { idUsuario: true, nombre: true, username: true, correo: true, fechaRegistro: true, estado: true },
    }));
};
exports.list = list;
const getById = async (req, res) => {
    const usuario = await prisma_1.default.usuario.findUnique({
        where: { idUsuario: req.params.id },
        include: { roles: { include: { rol: true } } },
    });
    if (!usuario)
        return res.status(404).json({ status: 'error', message: 'User not found' });
    const { contrasenaHash, ...rest } = usuario;
    res.json(rest);
};
exports.getById = getById;
const addRol = async (req, res) => {
    await prisma_1.default.usuarioRol.upsert({
        where: { idUsuario_idRol: { idUsuario: req.params.id, idRol: req.body.idRol } },
        update: {},
        create: { idUsuario: req.params.id, idRol: req.body.idRol },
    });
    res.status(201).json({ status: 'success' });
};
exports.addRol = addRol;
const removeRol = async (req, res) => {
    await prisma_1.default.usuarioRol.delete({
        where: { idUsuario_idRol: { idUsuario: req.params.id, idRol: req.body.idRol } },
    });
    res.status(204).send();
};
exports.removeRol = removeRol;
//# sourceMappingURL=usuario.controller.js.map