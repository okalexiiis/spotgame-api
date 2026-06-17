"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkStatus = exports.approve = exports.generate = void 0;
const prisma_1 = __importDefault(require("../lib/prisma"));
const crypto_1 = __importDefault(require("crypto"));
const generate = async (req, res) => {
    const codigo = crypto_1.default.randomBytes(4).toString('hex').toUpperCase();
    const expiraEn = new Date(Date.now() + 5 * 60 * 1000);
    try {
        const qr = await prisma_1.default.qrLogin.create({
            data: { codigo, expiraEn },
        });
        res.status(201).json(qr);
    }
    catch (error) {
        res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
};
exports.generate = generate;
const approve = async (req, res) => {
    const { codigo } = req.body;
    const idUsuario = req.user.idUsuario;
    try {
        const qr = await prisma_1.default.qrLogin.findUnique({ where: { codigo } });
        if (!qr || qr.estado !== 'pendiente' || qr.expiraEn < new Date()) {
            res.status(404).json({ status: 'error', message: 'Invalid or expired code' });
            return;
        }
        await prisma_1.default.qrLogin.update({
            where: { codigo },
            data: { estado: 'aprobado', idUsuario },
        });
        res.json({ status: 'success', message: 'Code approved' });
    }
    catch (error) {
        res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
};
exports.approve = approve;
const checkStatus = async (req, res) => {
    const codigo = req.params.codigo;
    try {
        const qr = await prisma_1.default.qrLogin.findUnique({
            where: { codigo },
            include: { usuario: true },
        });
        if (!qr) {
            res.status(404).json({ status: 'error', message: 'Code not found' });
            return;
        }
        if (qr.estado === 'aprobado' && qr.idUsuario) {
            const session = await prisma_1.default.sesion.create({
                data: {
                    idUsuario: qr.idUsuario,
                    token: crypto_1.default.randomBytes(32).toString('hex'),
                },
            });
            res.json({ estado: 'aprobado', token: session.token });
            return;
        }
        if (qr.expiraEn < new Date()) {
            res.json({ estado: 'expirado', token: null });
            return;
        }
        res.json({ estado: qr.estado, token: null });
    }
    catch (error) {
        res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
};
exports.checkStatus = checkStatus;
//# sourceMappingURL=qr.controller.js.map