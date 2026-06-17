"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeImagen = exports.addImagen = exports.remove = exports.update = exports.create = exports.getById = exports.list = void 0;
const prisma_1 = __importDefault(require("../lib/prisma"));
const list = async (req, res) => {
    const { page, limit, search } = req.query;
    const skip = (page - 1) * limit;
    const where = search
        ? {
            OR: [
                { titulo: { contains: search, mode: 'insensitive' } },
                { resumen: { contains: search, mode: 'insensitive' } },
            ],
        }
        : {};
    const [total, data] = await prisma_1.default.$transaction([
        prisma_1.default.noticia.count({ where }),
        prisma_1.default.noticia.findMany({
            where,
            skip,
            take: limit,
            orderBy: { createdAt: 'desc' },
            include: { autor: { select: { nombre: true, username: true } } },
        }),
    ]);
    res.json({
        data,
        meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
    });
};
exports.list = list;
const getById = async (req, res) => {
    const noticia = await prisma_1.default.noticia.findUnique({
        where: { idNoticia: req.params.id },
        include: { autor: { select: { nombre: true, username: true } }, imagenes: true },
    });
    if (!noticia)
        return res.status(404).json({ status: 'error', message: 'News not found' });
    res.json(noticia);
};
exports.getById = getById;
const create = async (req, res) => {
    const data = req.body;
    if (data.fechaPublicacion)
        data.fechaPublicacion = new Date(data.fechaPublicacion);
    if (!data.autorId && req.user)
        data.autorId = req.user.idUsuario;
    res.status(201).json(await prisma_1.default.noticia.create({ data }));
};
exports.create = create;
const update = async (req, res) => {
    const data = req.body;
    if (data.fechaPublicacion)
        data.fechaPublicacion = new Date(data.fechaPublicacion);
    res.json(await prisma_1.default.noticia.update({ where: { idNoticia: req.params.id }, data }));
};
exports.update = update;
const remove = async (req, res) => {
    await prisma_1.default.noticia.delete({ where: { idNoticia: req.params.id } });
    res.status(204).send();
};
exports.remove = remove;
const addImagen = async (req, res) => {
    res.status(201).json(await prisma_1.default.imagenNoticia.create({
        data: { ...req.body, idNoticia: req.params.id },
    }));
};
exports.addImagen = addImagen;
const removeImagen = async (req, res) => {
    await prisma_1.default.imagenNoticia.delete({ where: { id: req.params.idImagen } });
    res.status(204).send();
};
exports.removeImagen = removeImagen;
//# sourceMappingURL=noticia.controller.js.map