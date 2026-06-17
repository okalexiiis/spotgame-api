"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.presign = void 0;
const r2_1 = require("../lib/r2");
const crypto_1 = __importDefault(require("crypto"));
const presign = async (req, res) => {
    const { filename, contentType, folder } = req.body;
    try {
        const fileExtension = filename.split('.').pop();
        const storageKey = `${folder}/${crypto_1.default.randomUUID()}.${fileExtension}`;
        const result = await (0, r2_1.generatePresignedUrl)(storageKey, contentType);
        res.status(200).json(result);
    }
    catch (error) {
        console.error('Presign error:', error);
        res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
};
exports.presign = presign;
//# sourceMappingURL=upload.controller.js.map