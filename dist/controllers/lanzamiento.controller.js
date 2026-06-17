"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.update = exports.create = exports.getById = exports.list = void 0;
const prisma_1 = __importDefault(require("../lib/prisma"));
const list = async (req, res) => {
    res.json(await prisma_1.default.proximoLanzamiento.findMany({
        include: { juego: { select: { titulo: true, slug: true } } },
        orderBy: { fechaLanzamiento: 'asc' },
    }));
};
exports.list = list;
const getById = async (req, res) => {
    const lanzamiento = await prisma_1.default.proximoLanzamiento.findUnique({
        where: { idLanzamiento: req.params.id },
        include: { juego: true },
    });
    if (!lanzamiento)
        return res.status(404).json({ status: 'error', message: 'Release entry not found' });
    res.json(lanzamiento);
};
exports.getById = getById;
const create = async (req, res) => {
    const data = req.body;
    if (data.fechaLanzamiento)
        data.fechaLanzamiento = new Date(data.fechaLanzamiento);
    res.status(201).json(await prisma_1.default.proximoLanzamiento.create({ data }));
};
exports.create = create;
const update = async (req, res) => {
    const data = req.body;
    if (data.fechaLanzamiento)
        data.fechaLanzamiento = new Date(data.fechaLanzamiento);
    res.json(await prisma_1.default.proximoLanzamiento.update({ where: { idLanzamiento: req.params.id }, data }));
};
exports.update = update;
const remove = async (req, res) => {
    await prisma_1.default.proximoLanzamiento.delete({ where: { idLanzamiento: req.params.id } });
    res.status(204).send();
};
exports.remove = remove;
//# sourceMappingURL=lanzamiento.controller.js.map