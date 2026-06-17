"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePlataformaSchema = exports.CreatePlataformaSchema = exports.PlataformaSchema = void 0;
const zod_1 = require("zod");
const openapi_1 = require("../lib/openapi");
exports.PlataformaSchema = zod_1.z.object({
    idPlataforma: zod_1.z.string().uuid(),
    nombre: zod_1.z.string().min(1).max(100),
    tipo: zod_1.z.string().nullable(),
    iconoUrl: zod_1.z.string().nullable(),
});
exports.CreatePlataformaSchema = exports.PlataformaSchema.omit({ idPlataforma: true });
exports.UpdatePlataformaSchema = exports.CreatePlataformaSchema.partial();
const basePlataformaPath = '/catalogs/plataformas';
openapi_1.registry.registerPath({
    tags: ['Catalogos: Plataforma'],
    method: 'get',
    path: basePlataformaPath,
    summary: 'List all platforms',
    responses: {
        200: {
            description: 'List of platforms',
            content: { 'application/json': { schema: zod_1.z.array(exports.PlataformaSchema) } },
        },
    },
});
openapi_1.registry.registerPath({
    tags: ['Catalogos: Plataforma'],
    method: 'get',
    path: `${basePlataformaPath}/{id}`,
    summary: 'Get platform by ID',
    parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string', format: 'uuid' } }],
    responses: {
        200: {
            description: 'Platform found',
            content: { 'application/json': { schema: exports.PlataformaSchema } },
        },
        404: { description: 'Platform not found' },
    },
});
openapi_1.registry.registerPath({
    tags: ['Catalogos: Plataforma'],
    method: 'post',
    path: basePlataformaPath,
    summary: 'Create a new platform',
    security: [{ bearerAuth: [] }],
    request: {
        body: {
            content: { 'application/json': { schema: exports.CreatePlataformaSchema } },
        },
    },
    responses: {
        201: {
            description: 'Platform created',
            content: { 'application/json': { schema: exports.PlataformaSchema } },
        },
    },
});
openapi_1.registry.registerPath({
    tags: ['Catalogos: Plataforma'],
    method: 'put',
    path: `${basePlataformaPath}/{id}`,
    summary: 'Update a platform',
    security: [{ bearerAuth: [] }],
    parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string', format: 'uuid' } }],
    request: {
        body: {
            content: { 'application/json': { schema: exports.UpdatePlataformaSchema } },
        },
    },
    responses: {
        200: {
            description: 'Platform updated',
            content: { 'application/json': { schema: exports.PlataformaSchema } },
        },
    },
});
openapi_1.registry.registerPath({
    tags: ['Catalogos: Plataforma'],
    method: 'delete',
    path: `${basePlataformaPath}/{id}`,
    summary: 'Delete a platform',
    security: [{ bearerAuth: [] }],
    parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string', format: 'uuid' } }],
    responses: {
        204: { description: 'Platform deleted' },
    },
});
//# sourceMappingURL=plataforma.schema.js.map