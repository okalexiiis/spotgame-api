"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JuegoQuerySchema = exports.UpdateJuegoSchema = exports.CreateJuegoSchema = exports.JuegoSchema = void 0;
const zod_1 = require("zod");
const openapi_1 = require("../lib/openapi");
exports.JuegoSchema = zod_1.z.object({
    idJuego: zod_1.z.string().uuid(),
    titulo: zod_1.z.string().min(1).max(200),
    slug: zod_1.z.string().min(1).max(200),
    descripcion: zod_1.z.string().nullable(),
    fechaLanzamiento: zod_1.z.string().nullable(),
    desarrollador: zod_1.z.string().nullable(),
    editor: zod_1.z.string().nullable(),
    imagenPortada: zod_1.z.string().nullable(),
    bannerUrl: zod_1.z.string().nullable(),
    estado: zod_1.z.string().nullable(),
    destacado: zod_1.z.boolean(),
});
exports.CreateJuegoSchema = exports.JuegoSchema.omit({ idJuego: true });
exports.UpdateJuegoSchema = exports.CreateJuegoSchema.partial();
exports.JuegoQuerySchema = zod_1.z.object({
    page: zod_1.z.coerce.number().int().min(1).default(1).openapi({ example: 1 }),
    limit: zod_1.z.coerce.number().int().min(1).max(100).default(10).openapi({ example: 10 }),
    search: zod_1.z.string().optional().openapi({ example: 'Zelda' }),
    generoId: zod_1.z.string().uuid().optional(),
    plataformaId: zod_1.z.string().uuid().optional(),
});
const baseJuegoPath = '/juegos';
openapi_1.registry.registerPath({
    tags: ['Juegos'],
    method: 'get',
    path: baseJuegoPath,
    summary: 'List all games with pagination and filtering',
    parameters: [
        { name: 'page', in: 'query', schema: { type: 'integer', default: 1 } },
        { name: 'limit', in: 'query', schema: { type: 'integer', default: 10 } },
        { name: 'search', in: 'query', schema: { type: 'string' } },
        { name: 'generoId', in: 'query', schema: { type: 'string', format: 'uuid' } },
        { name: 'plataformaId', in: 'query', schema: { type: 'string', format: 'uuid' } },
    ],
    responses: {
        200: {
            description: 'List of games',
            content: {
                'application/json': {
                    schema: zod_1.z.object({
                        data: zod_1.z.array(exports.JuegoSchema),
                        meta: zod_1.z.object({
                            total: zod_1.z.number(),
                            page: zod_1.z.number(),
                            limit: zod_1.z.number(),
                            totalPages: zod_1.z.number(),
                        }),
                    }),
                },
            },
        },
    },
});
openapi_1.registry.registerPath({
    tags: ['Juegos'],
    method: 'get',
    path: `${baseJuegoPath}/{id}`,
    summary: 'Get a game by ID',
    parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string', format: 'uuid' } }],
    responses: {
        200: {
            description: 'Game found',
            content: { 'application/json': { schema: exports.JuegoSchema } },
        },
        404: { description: 'Game not found' },
    },
});
openapi_1.registry.registerPath({
    tags: ['Juegos'],
    method: 'post',
    path: baseJuegoPath,
    summary: 'Create a new game',
    security: [{ bearerAuth: [] }],
    request: {
        body: {
            content: { 'application/json': { schema: exports.CreateJuegoSchema } },
        },
    },
    responses: {
        201: {
            description: 'Game created',
            content: { 'application/json': { schema: exports.JuegoSchema } },
        },
        401: { description: 'Unauthorized' },
    },
});
openapi_1.registry.registerPath({
    tags: ['Juegos'],
    method: 'put',
    path: `${baseJuegoPath}/{id}`,
    summary: 'Update a game',
    security: [{ bearerAuth: [] }],
    parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string', format: 'uuid' } }],
    request: {
        body: {
            content: { 'application/json': { schema: exports.UpdateJuegoSchema } },
        },
    },
    responses: {
        200: {
            description: 'Game updated',
            content: { 'application/json': { schema: exports.JuegoSchema } },
        },
        404: { description: 'Game not found' },
    },
});
openapi_1.registry.registerPath({
    tags: ['Juegos'],
    method: 'delete',
    path: `${baseJuegoPath}/{id}`,
    summary: 'Delete a game',
    security: [{ bearerAuth: [] }],
    parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string', format: 'uuid' } }],
    responses: {
        204: { description: 'Game deleted' },
        404: { description: 'Game not found' },
    },
});
//# sourceMappingURL=juego.schema.js.map