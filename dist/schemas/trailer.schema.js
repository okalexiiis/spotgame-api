"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTrailerSchema = exports.CreateTrailerSchema = exports.TrailerSchema = void 0;
const zod_1 = require("zod");
const openapi_1 = require("../lib/openapi");
exports.TrailerSchema = zod_1.z.object({
    idTrailer: zod_1.z.string().uuid(),
    idJuego: zod_1.z.string().uuid(),
    titulo: zod_1.z.string().min(1).max(200),
    tipo: zod_1.z.string().nullable(),
    urlVideo: zod_1.z.string().nullable(),
    urlPoster: zod_1.z.string().nullable(),
    orden: zod_1.z.number().int().default(0),
    subidoPor: zod_1.z.string().uuid().nullable(),
    estadoRevision: zod_1.z.string().default('pendiente'),
    motivoRechazo: zod_1.z.string().nullable(),
    estadoArchivo: zod_1.z.string().default('subiendo'),
    storageKey: zod_1.z.string().nullable(),
    duracionSegundos: zod_1.z.number().int().nullable(),
    vistas: zod_1.z.number().int().default(0),
});
exports.CreateTrailerSchema = exports.TrailerSchema.omit({ idTrailer: true, vistas: true });
exports.UpdateTrailerSchema = exports.CreateTrailerSchema.partial();
const baseTrailerPath = '/trailers';
openapi_1.registry.registerPath({
    tags: ['Trailers'],
    method: 'get',
    path: baseTrailerPath,
    summary: 'List all trailers',
    responses: {
        200: {
            description: 'List of trailers',
            content: { 'application/json': { schema: zod_1.z.array(exports.TrailerSchema) } },
        },
    },
});
openapi_1.registry.registerPath({
    tags: ['Trailers'],
    method: 'get',
    path: `${baseTrailerPath}/{id}`,
    summary: 'Get trailer by ID',
    parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string', format: 'uuid' } }],
    responses: {
        200: {
            description: 'Trailer found',
            content: { 'application/json': { schema: exports.TrailerSchema } },
        },
        404: { description: 'Trailer not found' },
    },
});
openapi_1.registry.registerPath({
    tags: ['Trailers'],
    method: 'post',
    path: baseTrailerPath,
    summary: 'Create a new trailer',
    security: [{ bearerAuth: [] }],
    request: {
        body: {
            content: { 'application/json': { schema: exports.CreateTrailerSchema } },
        },
    },
    responses: {
        201: {
            description: 'Trailer created',
            content: { 'application/json': { schema: exports.TrailerSchema } },
        },
    },
});
openapi_1.registry.registerPath({
    tags: ['Trailers'],
    method: 'put',
    path: `${baseTrailerPath}/{id}`,
    summary: 'Update a trailer',
    security: [{ bearerAuth: [] }],
    parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string', format: 'uuid' } }],
    request: {
        body: {
            content: { 'application/json': { schema: exports.UpdateTrailerSchema } },
        },
    },
    responses: {
        200: {
            description: 'Trailer updated',
            content: { 'application/json': { schema: exports.TrailerSchema } },
        },
    },
});
openapi_1.registry.registerPath({
    tags: ['Trailers'],
    method: 'delete',
    path: `${baseTrailerPath}/{id}`,
    summary: 'Delete a trailer',
    security: [{ bearerAuth: [] }],
    parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string', format: 'uuid' } }],
    responses: {
        204: { description: 'Trailer deleted' },
    },
});
//# sourceMappingURL=trailer.schema.js.map