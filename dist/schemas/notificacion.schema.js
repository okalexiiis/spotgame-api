"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificacionSchema = void 0;
const zod_1 = require("zod");
const openapi_1 = require("../lib/openapi");
exports.NotificacionSchema = zod_1.z.object({
    idNotificacion: zod_1.z.string().uuid(),
    titulo: zod_1.z.string(),
    mensaje: zod_1.z.string(),
    tipo: zod_1.z.string().nullable(),
    leida: zod_1.z.boolean(),
    fechaCreacion: zod_1.z.string(),
    entidad: zod_1.z.string().nullable(),
    entidadId: zod_1.z.string().uuid().nullable(),
});
const baseNotifPath = '/me/notificaciones';
openapi_1.registry.registerPath({
    tags: ['User Features'],
    method: 'get',
    path: baseNotifPath,
    summary: 'List my notifications',
    security: [{ bearerAuth: [] }],
    responses: {
        200: {
            description: 'List of notifications',
            content: { 'application/json': { schema: zod_1.z.array(exports.NotificacionSchema) } },
        },
    },
});
openapi_1.registry.registerPath({
    tags: ['User Features'],
    method: 'patch',
    path: `${baseNotifPath}/{id}/read`,
    summary: 'Mark a notification as read',
    security: [{ bearerAuth: [] }],
    parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string', format: 'uuid' } }],
    responses: {
        200: { description: 'Marked as read' },
    },
});
openapi_1.registry.registerPath({
    tags: ['User Features'],
    method: 'patch',
    path: `${baseNotifPath}/read-all`,
    summary: 'Mark all notifications as read',
    security: [{ bearerAuth: [] }],
    responses: {
        200: { description: 'All marked as read' },
    },
});
//# sourceMappingURL=notificacion.schema.js.map