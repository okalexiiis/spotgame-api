"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateGeneroSchema = exports.CreateGeneroSchema = exports.GeneroSchema = void 0;
const zod_1 = require("zod");
const openapi_1 = require("../lib/openapi");
exports.GeneroSchema = zod_1.z.object({
    idGenero: zod_1.z.string().uuid(),
    nombre: zod_1.z.string().min(1).max(100),
    descripcion: zod_1.z.string().nullable(),
    iconoUrl: zod_1.z.string().nullable(),
});
exports.CreateGeneroSchema = exports.GeneroSchema.omit({ idGenero: true });
exports.UpdateGeneroSchema = exports.CreateGeneroSchema.partial();
const baseGeneroPath = '/catalogs/generos';
openapi_1.registry.registerPath({
    tags: ['Catalogos: Genero'],
    method: 'get',
    path: baseGeneroPath,
    summary: 'List all genres',
    responses: {
        200: {
            description: 'List of genres',
            content: { 'application/json': { schema: zod_1.z.array(exports.GeneroSchema) } },
        },
    },
});
openapi_1.registry.registerPath({
    tags: ['Catalogos: Genero'],
    method: 'get',
    path: `${baseGeneroPath}/{id}`,
    summary: 'Get genre by ID',
    parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string', format: 'uuid' } }],
    responses: {
        200: {
            description: 'Genre found',
            content: { 'application/json': { schema: exports.GeneroSchema } },
        },
        404: { description: 'Genre not found' },
    },
});
openapi_1.registry.registerPath({
    tags: ['Catalogos: Genero'],
    method: 'post',
    path: baseGeneroPath,
    summary: 'Create a new genre',
    security: [{ bearerAuth: [] }],
    request: {
        body: {
            content: { 'application/json': { schema: exports.CreateGeneroSchema } },
        },
    },
    responses: {
        201: {
            description: 'Genre created',
            content: { 'application/json': { schema: exports.GeneroSchema } },
        },
    },
});
openapi_1.registry.registerPath({
    tags: ['Catalogos: Genero'],
    method: 'put',
    path: `${baseGeneroPath}/{id}`,
    summary: 'Update a genre',
    security: [{ bearerAuth: [] }],
    parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string', format: 'uuid' } }],
    request: {
        body: {
            content: { 'application/json': { schema: exports.UpdateGeneroSchema } },
        },
    },
    responses: {
        200: {
            description: 'Genre updated',
            content: { 'application/json': { schema: exports.GeneroSchema } },
        },
    },
});
openapi_1.registry.registerPath({
    tags: ['Catalogos: Genero'],
    method: 'delete',
    path: `${baseGeneroPath}/{id}`,
    summary: 'Delete a genre',
    security: [{ bearerAuth: [] }],
    parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string', format: 'uuid' } }],
    responses: {
        204: { description: 'Genre deleted' },
    },
});
//# sourceMappingURL=genero.schema.js.map