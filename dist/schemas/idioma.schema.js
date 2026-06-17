"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateIdiomaSchema = exports.CreateIdiomaSchema = exports.IdiomaSchema = void 0;
const zod_1 = require("zod");
const openapi_1 = require("../lib/openapi");
exports.IdiomaSchema = zod_1.z.object({
    idIdioma: zod_1.z.string().uuid(),
    codigo: zod_1.z.string().min(1).max(10),
    nombre: zod_1.z.string().min(1).max(100),
    banderaUrl: zod_1.z.string().nullable(),
    activo: zod_1.z.boolean(),
});
exports.CreateIdiomaSchema = exports.IdiomaSchema.omit({ idIdioma: true });
exports.UpdateIdiomaSchema = exports.CreateIdiomaSchema.partial();
const baseIdiomaPath = '/catalogs/idiomas';
openapi_1.registry.registerPath({
    tags: ['Catalogos: Idioma'],
    method: 'get',
    path: baseIdiomaPath,
    summary: 'List all languages',
    responses: {
        200: {
            description: 'List of languages',
            content: { 'application/json': { schema: zod_1.z.array(exports.IdiomaSchema) } },
        },
    },
});
openapi_1.registry.registerPath({
    tags: ['Catalogos: Idioma'],
    method: 'get',
    path: `${baseIdiomaPath}/{id}`,
    summary: 'Get language by ID',
    parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string', format: 'uuid' } }],
    responses: {
        200: {
            description: 'Language found',
            content: { 'application/json': { schema: exports.IdiomaSchema } },
        },
        404: { description: 'Language not found' },
    },
});
openapi_1.registry.registerPath({
    tags: ['Catalogos: Idioma'],
    method: 'post',
    path: baseIdiomaPath,
    summary: 'Create a new language',
    security: [{ bearerAuth: [] }],
    request: {
        body: {
            content: { 'application/json': { schema: exports.CreateIdiomaSchema } },
        },
    },
    responses: {
        201: {
            description: 'Language created',
            content: { 'application/json': { schema: exports.IdiomaSchema } },
        },
    },
});
openapi_1.registry.registerPath({
    tags: ['Catalogos: Idioma'],
    method: 'put',
    path: `${baseIdiomaPath}/{id}`,
    summary: 'Update a language',
    security: [{ bearerAuth: [] }],
    parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string', format: 'uuid' } }],
    request: {
        body: {
            content: { 'application/json': { schema: exports.UpdateIdiomaSchema } },
        },
    },
    responses: {
        200: {
            description: 'Language updated',
            content: { 'application/json': { schema: exports.IdiomaSchema } },
        },
    },
});
openapi_1.registry.registerPath({
    tags: ['Catalogos: Idioma'],
    method: 'delete',
    path: `${baseIdiomaPath}/{id}`,
    summary: 'Delete a language',
    security: [{ bearerAuth: [] }],
    parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string', format: 'uuid' } }],
    responses: {
        204: { description: 'Language deleted' },
    },
});
//# sourceMappingURL=idioma.schema.js.map