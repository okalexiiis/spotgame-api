"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const prisma_1 = __importDefault(require("../lib/prisma"));
const authenticate = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401).json({ status: 'error', message: 'Unauthorized' });
        return;
    }
    const token = authHeader.split(' ')[1];
    try {
        const sesion = await prisma_1.default.sesion.findUnique({
            where: { token },
            include: { usuario: true },
        });
        if (!sesion || !sesion.activa || (sesion.fechaFin && sesion.fechaFin < new Date())) {
            res.status(401).json({ status: 'error', message: 'Unauthorized' });
            return;
        }
        req.user = sesion.usuario;
        next();
    }
    catch (error) {
        console.error('Auth middleware error:', error);
        res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
};
exports.authenticate = authenticate;
//# sourceMappingURL=auth.middleware.js.map