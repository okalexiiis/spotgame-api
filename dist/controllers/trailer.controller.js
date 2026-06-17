"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeCategoria = exports.addCategoria = exports.remove = exports.update = exports.create = exports.getById = exports.list = void 0;
const prisma_1 = __importDefault(require("../lib/prisma"));
const list = async (req, res) => {
    res.json(await prisma_1.default.trailer.findMany({
        orderBy: { createdAt: 'desc' },
        include: { juego: { select: { titulo: true } } },
    }));
};
exports.list = list;
const getById = async (req, res) => {
    const trailer = await prisma_1.default.trailer.findUnique({
        where: { idTrailer: req.params.id },
        include: { juego: { select: { titulo: true } } },
    });
    if (!trailer)
        return res.status(404).json({ status: 'error', message: 'Trailer not found' });
    res.json(trailer);
};
exports.getById = getById;
const create = async (req, res) => {
    const data = req.body;
    if (!data.subidoPor && req.user)
        data.subidoPor = req.user.idUsuario;
    res.status(201).json(await prisma_1.default.trailer.create({ data }));
};
exports.create = create;
const update = async (req, res) => {
    res.json(await prisma_1.default.trailer.update({
        where: { idTrailer: req.params.id },
        data: req.body,
    }));
};
exports.update = update;
const remove = async (req, res) => {
    await prisma_1.default.trailer.delete({ where: { idTrailer: req.params.id } });
    res.status(204).send();
};
exports.remove = remove;
const addCategoria = async (req, res) => {
    const { idCategoria } = req.body;
    await prisma_1.default.trailerCategoria.upsert({
        where: { idTrailer_idCategoria: { idTrailer: req.params.id, idCategoria } },
        update: {},
        create: { idTrailer: req.params.id, idCategoria },
    });
    res.status(201).json({ status: 'success' });
};
exports.addCategoria = addCategoria;
const removeCategoria = async (req, res) => {
    await prisma_1.default.trailerCategoria.delete({
        where: { idTrailer_idCategoria: { idTrailer: req.params.id, idCategoria: req.body.idCategoria } },
    });
    res.status(204).send();
};
exports.removeCategoria = removeCategoria;
//# sourceMappingURL=trailer.controller.js.map