"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removePlataforma = exports.addPlataforma = exports.removeGenero = exports.addGenero = exports.remove = exports.update = exports.create = exports.getById = exports.list = void 0;
const prisma_1 = __importDefault(require("../lib/prisma"));
const list = async (req, res) => {
    const { page, limit, search, generoId, plataformaId } = req.query;
    const skip = (page - 1) * limit;
    const where = {
        AND: [
            search ? { titulo: { contains: search, mode: 'insensitive' } } : {},
            generoId ? { generos: { some: { idGenero: generoId } } } : {},
            plataformaId ? { plataformas: { some: { idPlataforma: plataformaId } } } : {},
        ],
    };
    const [total, data] = await prisma_1.default.$transaction([
        prisma_1.default.juego.count({ where }),
        prisma_1.default.juego.findMany({
            where,
            skip,
            take: limit,
            orderBy: { createdAt: 'desc' },
            include: { generos: { include: { genero: true } }, plataformas: { include: { plataforma: true } } },
        }),
    ]);
    res.json({
        data,
        meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
    });
};
exports.list = list;
const getById = async (req, res) => {
    const juego = await prisma_1.default.juego.findUnique({ where: { idJuego: req.params.id } });
    if (!juego)
        return res.status(404).json({ status: 'error', message: 'Game not found' });
    res.json(juego);
};
exports.getById = getById;
const create = async (req, res) => {
    const data = req.body;
    if (data.fechaLanzamiento)
        data.fechaLanzamiento = new Date(data.fechaLanzamiento);
    res.status(201).json(await prisma_1.default.juego.create({ data }));
};
exports.create = create;
const update = async (req, res) => {
    const data = req.body;
    if (data.fechaLanzamiento)
        data.fechaLanzamiento = new Date(data.fechaLanzamiento);
    res.json(await prisma_1.default.juego.update({
        where: { idJuego: req.params.id },
        data,
    }));
};
exports.update = update;
const remove = async (req, res) => {
    await prisma_1.default.juego.delete({ where: { idJuego: req.params.id } });
    res.status(204).send();
};
exports.remove = remove;
const addGenero = async (req, res) => {
    const { idGenero } = req.body;
    await prisma_1.default.juegoGenero.upsert({
        where: { idJuego_idGenero: { idJuego: req.params.id, idGenero } },
        update: {},
        create: { idJuego: req.params.id, idGenero },
    });
    res.status(201).json({ status: 'success' });
};
exports.addGenero = addGenero;
const removeGenero = async (req, res) => {
    const { idGenero } = req.body;
    await prisma_1.default.juegoGenero.delete({
        where: { idJuego_idGenero: { idJuego: req.params.id, idGenero: idGenero } },
    });
    res.status(204).send();
};
exports.removeGenero = removeGenero;
const addPlataforma = async (req, res) => {
    const { idPlataforma } = req.body;
    await prisma_1.default.juegoPlataforma.upsert({
        where: { idJuego_idPlataforma: { idJuego: req.params.id, idPlataforma } },
        update: {},
        create: { idJuego: req.params.id, idPlataforma },
    });
    res.status(201).json({ status: 'success' });
};
exports.addPlataforma = addPlataforma;
const removePlataforma = async (req, res) => {
    const { idPlataforma } = req.body;
    await prisma_1.default.juegoPlataforma.delete({
        where: { idJuego_idPlataforma: { idJuego: req.params.id, idPlataforma: idPlataforma } },
    });
    res.status(204).send();
};
exports.removePlataforma = removePlataforma;
//# sourceMappingURL=juego.controller.js.map