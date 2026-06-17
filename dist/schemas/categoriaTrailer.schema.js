"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCategoriaTrailerSchema = exports.CreateCategoriaTrailerSchema = exports.CategoriaTrailerSchema = void 0;
const zod_1 = require("zod");
const openapi_1 = require("../lib/openapi");
exports.CategoriaTrailerSchema = zod_1.z.object({
    idCategoria: zod_1.z.string().uuid(),
    nombre: zod_1.z.string().min(1).max(100),
});
exports.CreateCategoriaTrailerSchema = exports.CategoriaTrailerSchema.omit({ idCategoria: true });
exports.UpdateCategoriaTrailerSchema = exports.CreateCategoriaTrailerSchema.partial();
const baseCategoriaTrailerPath = '/catalogs/categorias-trailer';
openapi_1.registry.registerPath({
    tags: ['Catalogos: CategoriaTrailer'],
    method: 'get',
    path: baseCategoriaTrailerPath,
    summary: 'List all trailer categories',
    responses: {
        200: {
            description: 'List of categories',
            content: { 'application/json': { schema: zod_1.z.array(exports.CategoriaTrailerSchema) } },
        },
    },
});
openapi_1.registry.registerPath({
    tags: ['Catalogos: CategoriaTrailer'],
    method: 'get',
    path: `${baseCategoriaTrailerPath}/{id}`,
    summary: 'Get category by ID',
    parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string', format: 'uuid' } }],
    responses: {
        200: {
            description: 'Category found',
            content: { 'application/json': { schema: exports.CategoriaTrailerSchema } },
        },
        404: { description: 'Category not found' },
    },
});
openapi_1.registry.registerPath({
    tags: ['Catalogos: CategoriaTrailer'],
    method: 'post',
    path: baseCategoriaTrailerPath,
    summary: 'Create a new trailer category',
    security: [{ bearerAuth: [] }],
    request: {
        body: {
            content: { 'application/json': { schema: exports.CreateCategoriaTrailerSchema } },
        },
    },
    responses: {
        201: {
            description: 'Category created',
            content: { 'application/json': { schema: exports.CategoriaTrailerSchema } },
        },
    },
});
openapi_1.registry.registerPath({
    tags: ['Catalogos: CategoriaTrailer'],
    method: 'put',
    path: `${baseCategoriaTrailerPath}/{id}`,
    summary: 'Update a category',
    security: [{ bearerAuth: [] }],
    parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string', format: 'uuid' } }],
    request: {
        body: {
            content: { 'application/json': { schema: exports.UpdateCategoriaTrailerSchema } },
        },
    },
    responses: {
        200: {
            description: 'Category updated',
            content: { 'application/json': { schema: exports.CategoriaTrailerSchema } },
        },
    },
});
openapi_1.registry.registerPath({
    tags: ['Catalogos: CategoriaTrailer'],
    method: 'delete',
    path: `${baseCategoriaTrailerPath}/{id}`,
    summary: 'Delete a category',
    security: [{ bearerAuth: [] }],
    parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string', format: 'uuid' } }],
    responses: {
        204: { description: 'Category deleted' },
    },
});
//# sourceMappingURL=categoriaTrailer.schema.js.map