"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listMine = void 0;
const prisma_1 = __importDefault(require("../lib/prisma"));
const listMine = async (req, res) => {
    try {
        const logs = await prisma_1.default.logActividad.findMany({
            where: { idUsuario: req.user.idUsuario },
            orderBy: { fecha: 'desc' },
            take: 50,
        });
        res.json(logs);
    }
    catch (error) {
        res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
};
exports.listMine = listMine;
//# sourceMappingURL=log.controller.js.map