"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QrStatusResponseSchema = exports.QrApproveRequestSchema = exports.QrGenerateResponseSchema = void 0;
const zod_1 = require("zod");
const openapi_1 = require("../lib/openapi");
exports.QrGenerateResponseSchema = zod_1.z.object({
    codigo: zod_1.z.string().length(8),
    expiraEn: zod_1.z.string(),
});
exports.QrApproveRequestSchema = zod_1.z.object({
    codigo: zod_1.z.string().length(8).openapi({ example: 'ABC123XY' }),
});
exports.QrStatusResponseSchema = zod_1.z.object({
    estado: zod_1.z.enum(['pendiente', 'aprobado', 'expirado']),
    token: zod_1.z.string().nullable().openapi({ description: 'Provided only if status is approved' }),
});
const baseQrPath = '/qr-login';
openapi_1.registry.registerPath({
    tags: ['QR Login'],
    method: 'post',
    path: `${baseQrPath}/generate`,
    summary: 'Generate a QR login code (for TV client)',
    responses: {
        201: {
            description: 'Code generated',
            content: { 'application/json': { schema: exports.QrGenerateResponseSchema } },
        },
    },
});
openapi_1.registry.registerPath({
    tags: ['QR Login'],
    method: 'post',
    path: `${baseQrPath}/approve`,
    summary: 'Approve a QR login code (for Mobile client)',
    security: [{ bearerAuth: [] }],
    request: { body: { content: { 'application/json': { schema: exports.QrApproveRequestSchema } } } },
    responses: {
        200: { description: 'Code approved' },
        404: { description: 'Code not found or expired' },
    },
});
openapi_1.registry.registerPath({
    tags: ['QR Login'],
    method: 'get',
    path: `${baseQrPath}/status/{codigo}`,
    summary: 'Check the status of a QR login code',
    parameters: [{ name: 'codigo', in: 'path', required: true, schema: { type: 'string' } }],
    responses: {
        200: {
            description: 'Current status',
            content: { 'application/json': { schema: exports.QrStatusResponseSchema } },
        },
    },
});
//# sourceMappingURL=qr.schema.js.map