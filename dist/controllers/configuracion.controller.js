"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateMine = exports.getMine = void 0;
const prisma_1 = __importDefault(require("../lib/prisma"));
const getMine = async (req, res) => {
    const idUsuario = req.user.idUsuario;
    try {
        const config = await prisma_1.default.configuracionUsuario.findUnique({
            where: { idUsuario },
        });
        res.json(config || {});
    }
    catch (error) {
        res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
};
exports.getMine = getMine;
const updateMine = async (req, res) => {
    const idUsuario = req.user.idUsuario;
    try {
        const config = await prisma_1.default.configuracionUsuario.upsert({
            where: { idUsuario },
            update: req.body,
            create: { ...req.body, idUsuario },
        });
        res.json(config);
    }
    catch (error) {
        res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
};
exports.updateMine = updateMine;
//# sourceMappingURL=configuracion.controller.js.map