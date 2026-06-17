"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateConfiguracionSchema = exports.ConfiguracionUsuarioSchema = void 0;
const zod_1 = require("zod");
const openapi_1 = require("../lib/openapi");
exports.ConfiguracionUsuarioSchema = zod_1.z.object({
    tema: zod_1.z.string().max(20).nullable().openapi({ example: 'dark' }),
    emailNotificaciones: zod_1.z.boolean().default(true),
    notificacionesPush: zod_1.z.boolean().default(true),
    privacidadPerfil: zod_1.z.string().max(20).nullable().openapi({ example: 'public' }),
    controlParental: zod_1.z.boolean().default(false),
    calidadVideo: zod_1.z.string().max(20).default('auto').openapi({ example: '1080p' }),
    tamanoTexto: zod_1.z.string().max(20).default('normal').openapi({ example: 'normal' }),
    idiomaId: zod_1.z.string().uuid().nullable(),
});
exports.UpdateConfiguracionSchema = exports.ConfiguracionUsuarioSchema.partial();
const baseConfigPath = '/me/configuracion';
openapi_1.registry.registerPath({
    tags: ['User Features'],
    method: 'get',
    path: baseConfigPath,
    summary: 'Get my configuration',
    security: [{ bearerAuth: [] }],
    responses: {
        200: {
            description: 'Your configuration',
            content: { 'application/json': { schema: exports.ConfiguracionUsuarioSchema } },
        },
        401: { description: 'Unauthorized' },
    },
});
openapi_1.registry.registerPath({
    tags: ['User Features'],
    method: 'put',
    path: baseConfigPath,
    summary: 'Update my configuration',
    security: [{ bearerAuth: [] }],
    request: {
        body: {
            content: { 'application/json': { schema: exports.UpdateConfiguracionSchema } },
        },
    },
    responses: {
        200: {
            description: 'Configuration updated',
            content: { 'application/json': { schema: exports.ConfiguracionUsuarioSchema } },
        },
        401: { description: 'Unauthorized' },
    },
});
//# sourceMappingURL=configuracion.schema.js.map