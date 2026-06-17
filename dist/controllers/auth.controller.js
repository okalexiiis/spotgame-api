"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.login = exports.register = void 0;
const prisma_1 = __importDefault(require("../lib/prisma"));
const crypto_1 = require("../lib/crypto");
const register = async (req, res) => {
    const { nombre, username, correo, contrasena } = req.body;
    const existingUser = await prisma_1.default.usuario.findFirst({
        where: { OR: [{ correo }, { username }] },
    });
    if (existingUser)
        return res.status(400).json({ status: 'error', message: 'User already exists' });
    const hashedPassword = await (0, crypto_1.hashPassword)(contrasena);
    const usuario = await prisma_1.default.usuario.create({
        data: { nombre, username, correo, contrasenaHash: hashedPassword },
    });
    const token = (0, crypto_1.generateToken)();
    await prisma_1.default.sesion.create({ data: { idUsuario: usuario.idUsuario, token } });
    res.status(201).json({ token, usuario: { idUsuario: usuario.idUsuario, nombre: usuario.nombre, username: usuario.username, correo: usuario.correo } });
};
exports.register = register;
const login = async (req, res) => {
    const { username, contrasena } = req.body;
    const usuario = await prisma_1.default.usuario.findUnique({ where: { username } });
    if (!usuario || !(await (0, crypto_1.comparePassword)(contrasena, usuario.contrasenaHash))) {
        return res.status(401).json({ status: 'error', message: 'Invalid credentials' });
    }
    const token = (0, crypto_1.generateToken)();
    await prisma_1.default.sesion.create({ data: { idUsuario: usuario.idUsuario, token } });
    res.status(200).json({ token, usuario: { idUsuario: usuario.idUsuario, nombre: usuario.nombre, username: usuario.username, correo: usuario.correo } });
};
exports.login = login;
const logout = async (req, res) => {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(' ')[1];
    if (!token)
        return res.status(400).json({ status: 'error', message: 'No token provided' });
    await prisma_1.default.sesion.updateMany({
        where: { token, activa: true },
        data: { activa: false, fechaFin: new Date() },
    });
    res.status(200).json({ status: 'success', message: 'Logged out' });
};
exports.logout = logout;
//# sourceMappingURL=auth.controller.js.map