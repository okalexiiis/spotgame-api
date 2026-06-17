"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogActividadSchema = void 0;
const zod_1 = require("zod");
const openapi_1 = require("../lib/openapi");
exports.LogActividadSchema = zod_1.z.object({
    idLog: zod_1.z.string().uuid(),
    accion: zod_1.z.string(),
    entidad: zod_1.z.string(),
    entidadId: zod_1.z.string().uuid().nullable(),
    detalles: zod_1.z.any().nullable(),
    ipAddress: zod_1.z.string().nullable(),
    fecha: zod_1.z.string(),
});
openapi_1.registry.registerPath({
    tags: ['User Features'],
    method: 'get',
    path: '/me/logs',
    summary: 'List my activity logs',
    security: [{ bearerAuth: [] }],
    responses: {
        200: {
            description: 'List of activity logs',
            content: { 'application/json': { schema: zod_1.z.array(exports.LogActividadSchema) } },
        },
    },
});
//# sourceMappingURL=log.schema.js.map