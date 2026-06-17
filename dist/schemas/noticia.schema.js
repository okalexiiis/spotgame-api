"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoticiaQuerySchema = exports.UpdateNoticiaSchema = exports.CreateNoticiaSchema = exports.NoticiaSchema = void 0;
const zod_1 = require("zod");
const openapi_1 = require("../lib/openapi");
exports.NoticiaSchema = zod_1.z.object({
    idNoticia: zod_1.z.string().uuid(),
    titulo: zod_1.z.string().min(1).max(200),
    slug: zod_1.z.string().min(1).max(200),
    resumen: zod_1.z.string().nullable(),
    contenido: zod_1.z.string().min(1),
    imagenPortada: zod_1.z.string().nullable(),
    fechaPublicacion: zod_1.z.string().nullable(),
    autorId: zod_1.z.string().uuid().nullable(),
    destacada: zod_1.z.boolean(),
});
exports.CreateNoticiaSchema = exports.NoticiaSchema.omit({ idNoticia: true });
exports.UpdateNoticiaSchema = exports.CreateNoticiaSchema.partial();
exports.NoticiaQuerySchema = zod_1.z.object({
    page: zod_1.z.coerce.number().int().min(1).default(1).openapi({ example: 1 }),
    limit: zod_1.z.coerce.number().int().min(1).max(100).default(10).openapi({ example: 10 }),
    search: zod_1.z.string().optional().openapi({ example: 'Update' }),
});
const baseNoticiaPath = '/noticias';
openapi_1.registry.registerPath({
    tags: ['Noticias'],
    method: 'get',
    path: baseNoticiaPath,
    summary: 'List all news with pagination',
    parameters: [
        { name: 'page', in: 'query', schema: { type: 'integer', default: 1 } },
        { name: 'limit', in: 'query', schema: { type: 'integer', default: 10 } },
        { name: 'search', in: 'query', schema: { type: 'string' } },
    ],
    responses: {
        200: {
            description: 'List of news',
            content: {
                'application/json': {
                    schema: zod_1.z.object({
                        data: zod_1.z.array(exports.NoticiaSchema),
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
    tags: ['Noticias'],
    method: 'get',
    path: `${baseNoticiaPath}/{id}`,
    summary: 'Get news by ID',
    parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string', format: 'uuid' } }],
    responses: {
        200: {
            description: 'News found',
            content: { 'application/json': { schema: exports.NoticiaSchema } },
        },
        404: { description: 'News not found' },
    },
});
openapi_1.registry.registerPath({
    tags: ['Noticias'],
    method: 'post',
    path: baseNoticiaPath,
    summary: 'Create a news article',
    security: [{ bearerAuth: [] }],
    request: {
        body: {
            content: { 'application/json': { schema: exports.CreateNoticiaSchema } },
        },
    },
    responses: {
        201: {
            description: 'News created',
            content: { 'application/json': { schema: exports.NoticiaSchema } },
        },
    },
});
openapi_1.registry.registerPath({
    tags: ['Noticias'],
    method: 'put',
    path: `${baseNoticiaPath}/{id}`,
    summary: 'Update news article',
    security: [{ bearerAuth: [] }],
    parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string', format: 'uuid' } }],
    request: {
        body: {
            content: { 'application/json': { schema: exports.UpdateNoticiaSchema } },
        },
    },
    responses: {
        200: {
            description: 'News updated',
            content: { 'application/json': { schema: exports.NoticiaSchema } },
        },
    },
});
openapi_1.registry.registerPath({
    tags: ['Noticias'],
    method: 'delete',
    path: `${baseNoticiaPath}/{id}`,
    summary: 'Delete news article',
    security: [{ bearerAuth: [] }],
    parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string', format: 'uuid' } }],
    responses: {
        204: { description: 'News deleted' },
    },
});
//# sourceMappingURL=noticia.schema.js.map