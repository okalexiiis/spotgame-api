"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddImagenNoticiaSchema = exports.LinkRolSchema = exports.LinkCategoriaSchema = exports.LinkPlataformaSchema = exports.LinkGeneroSchema = exports.UpdateLanzamientoSchema = exports.CreateLanzamientoSchema = exports.ProximoLanzamientoSchema = void 0;
const zod_1 = require("zod");
const openapi_1 = require("../lib/openapi");
exports.ProximoLanzamientoSchema = zod_1.z.object({
    idLanzamiento: zod_1.z.string().uuid(),
    idJuego: zod_1.z.string().uuid(),
    fechaLanzamiento: zod_1.z.string().nullable(),
    ventanaLanzamiento: zod_1.z.string().nullable(),
    descripcion: zod_1.z.string().nullable(),
    bannerUrl: zod_1.z.string().nullable(),
    destacado: zod_1.z.boolean(),
});
exports.CreateLanzamientoSchema = exports.ProximoLanzamientoSchema.omit({ idLanzamiento: true });
exports.UpdateLanzamientoSchema = exports.CreateLanzamientoSchema.partial();
exports.LinkGeneroSchema = zod_1.z.object({ idGenero: zod_1.z.string().uuid() });
exports.LinkPlataformaSchema = zod_1.z.object({ idPlataforma: zod_1.z.string().uuid() });
exports.LinkCategoriaSchema = zod_1.z.object({ idCategoria: zod_1.z.string().uuid() });
exports.LinkRolSchema = zod_1.z.object({ idRol: zod_1.z.string().uuid() });
exports.AddImagenNoticiaSchema = zod_1.z.object({
    urlImagen: zod_1.z.string().url(),
    orden: zod_1.z.number().int().default(0),
    leyenda: zod_1.z.string().max(255).nullable(),
});
const launchPath = '/proximos-lanzamientos';
openapi_1.registry.registerPath({
    tags: ['Proximos Lanzamientos'],
    method: 'get',
    path: launchPath,
    summary: 'List all upcoming releases',
    responses: { 200: { description: 'List of launches', content: { 'application/json': { schema: zod_1.z.array(exports.ProximoLanzamientoSchema) } } } },
});
openapi_1.registry.registerPath({
    tags: ['Proximos Lanzamientos'],
    method: 'post',
    path: launchPath,
    summary: 'Create an upcoming release entry',
    security: [{ bearerAuth: [] }],
    request: { body: { content: { 'application/json': { schema: exports.CreateLanzamientoSchema } } } },
    responses: { 201: { description: 'Launch entry created' } },
});
openapi_1.registry.registerPath({
    tags: ['Juegos'],
    method: 'post',
    path: '/juegos/{id}/generos',
    summary: 'Link a genre to a game',
    security: [{ bearerAuth: [] }],
    parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string', format: 'uuid' } }],
    request: { body: { content: { 'application/json': { schema: exports.LinkGeneroSchema } } } },
    responses: { 201: { description: 'Genre linked' } },
});
openapi_1.registry.registerPath({
    tags: ['Juegos'],
    method: 'post',
    path: '/juegos/{id}/plataformas',
    summary: 'Link a platform to a game',
    security: [{ bearerAuth: [] }],
    parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string', format: 'uuid' } }],
    request: { body: { content: { 'application/json': { schema: exports.LinkPlataformaSchema } } } },
    responses: { 201: { description: 'Platform linked' } },
});
openapi_1.registry.registerPath({
    tags: ['Trailers'],
    method: 'post',
    path: '/trailers/{id}/categorias',
    summary: 'Link a category to a trailer',
    security: [{ bearerAuth: [] }],
    parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string', format: 'uuid' } }],
    request: { body: { content: { 'application/json': { schema: exports.LinkCategoriaSchema } } } },
    responses: { 201: { description: 'Category linked' } },
});
openapi_1.registry.registerPath({
    tags: ['Noticias'],
    method: 'post',
    path: '/noticias/{id}/imagenes',
    summary: 'Add an image to a news article gallery',
    security: [{ bearerAuth: [] }],
    parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string', format: 'uuid' } }],
    request: { body: { content: { 'application/json': { schema: exports.AddImagenNoticiaSchema } } } },
    responses: { 201: { description: 'Image added' } },
});
openapi_1.registry.registerPath({
    tags: ['Usuarios'],
    method: 'post',
    path: '/usuarios/{id}/roles',
    summary: 'Assign a role to a user',
    security: [{ bearerAuth: [] }],
    parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string', format: 'uuid' } }],
    request: { body: { content: { 'application/json': { schema: exports.LinkRolSchema } } } },
    responses: { 201: { description: 'Role assigned' } },
});
//# sourceMappingURL=relations.schema.js.map