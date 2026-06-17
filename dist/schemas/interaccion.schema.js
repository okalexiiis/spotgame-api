"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddReservaSchema = exports.ReservaSchema = exports.LogDescargaSchema = exports.DescargaSchema = exports.AddFavoritoSchema = exports.FavoritoSchema = void 0;
const zod_1 = require("zod");
const openapi_1 = require("../lib/openapi");
exports.FavoritoSchema = zod_1.z.object({
    idFavorito: zod_1.z.string().uuid(),
    idJuego: zod_1.z.string().uuid(),
    fechaAgregado: zod_1.z.string(),
});
exports.AddFavoritoSchema = zod_1.z.object({
    idJuego: zod_1.z.string().uuid().openapi({ example: 'uuid-of-game' }),
});
exports.DescargaSchema = zod_1.z.object({
    idDescarga: zod_1.z.string().uuid(),
    idJuego: zod_1.z.string().uuid(),
    fechaDescarga: zod_1.z.string(),
    plataforma: zod_1.z.string().nullable(),
});
exports.LogDescargaSchema = zod_1.z.object({
    idJuego: zod_1.z.string().uuid(),
    plataforma: zod_1.z.string().min(1).max(100).openapi({ example: 'PS5' }),
});
exports.ReservaSchema = zod_1.z.object({
    idReserva: zod_1.z.string().uuid(),
    idLanzamiento: zod_1.z.string().uuid(),
    fechaReserva: zod_1.z.string(),
});
exports.AddReservaSchema = zod_1.z.object({
    idLanzamiento: zod_1.z.string().uuid().openapi({ example: 'uuid-of-launch' }),
});
const baseMePath = '/me';
openapi_1.registry.registerPath({
    tags: ['User Features'],
    method: 'get',
    path: `${baseMePath}/favoritos`,
    summary: 'List my favorite games',
    security: [{ bearerAuth: [] }],
    responses: {
        200: {
            description: 'List of favorites',
            content: { 'application/json': { schema: zod_1.z.array(exports.FavoritoSchema) } },
        },
    },
});
openapi_1.registry.registerPath({
    tags: ['User Features'],
    method: 'post',
    path: `${baseMePath}/favoritos`,
    summary: 'Add a game to favorites',
    security: [{ bearerAuth: [] }],
    request: { body: { content: { 'application/json': { schema: exports.AddFavoritoSchema } } } },
    responses: {
        201: { description: 'Added to favorites' },
    },
});
openapi_1.registry.registerPath({
    tags: ['User Features'],
    method: 'delete',
    path: `${baseMePath}/favoritos/{idJuego}`,
    summary: 'Remove a game from favorites',
    security: [{ bearerAuth: [] }],
    parameters: [{ name: 'idJuego', in: 'path', required: true, schema: { type: 'string', format: 'uuid' } }],
    responses: {
        204: { description: 'Removed from favorites' },
    },
});
openapi_1.registry.registerPath({
    tags: ['User Features'],
    method: 'get',
    path: `${baseMePath}/descargas`,
    summary: 'List my download history',
    security: [{ bearerAuth: [] }],
    responses: {
        200: {
            description: 'List of downloads',
            content: { 'application/json': { schema: zod_1.z.array(exports.DescargaSchema) } },
        },
    },
});
openapi_1.registry.registerPath({
    tags: ['User Features'],
    method: 'post',
    path: `${baseMePath}/descargas`,
    summary: 'Log a game download',
    security: [{ bearerAuth: [] }],
    request: { body: { content: { 'application/json': { schema: exports.LogDescargaSchema } } } },
    responses: {
        201: { description: 'Download logged' },
    },
});
openapi_1.registry.registerPath({
    tags: ['User Features'],
    method: 'get',
    path: `${baseMePath}/reservas`,
    summary: 'List my game reservations',
    security: [{ bearerAuth: [] }],
    responses: {
        200: {
            description: 'List of reservations',
            content: { 'application/json': { schema: zod_1.z.array(exports.ReservaSchema) } },
        },
    },
});
openapi_1.registry.registerPath({
    tags: ['User Features'],
    method: 'post',
    path: `${baseMePath}/reservas`,
    summary: 'Reserve an upcoming release',
    security: [{ bearerAuth: [] }],
    request: { body: { content: { 'application/json': { schema: exports.AddReservaSchema } } } },
    responses: {
        201: { description: 'Reservation created' },
    },
});
openapi_1.registry.registerPath({
    tags: ['User Features'],
    method: 'delete',
    path: `${baseMePath}/reservas/{idLanzamiento}`,
    summary: 'Cancel a reservation',
    security: [{ bearerAuth: [] }],
    parameters: [{ name: 'idLanzamiento', in: 'path', required: true, schema: { type: 'string', format: 'uuid' } }],
    responses: {
        204: { description: 'Reservation cancelled' },
    },
});
//# sourceMappingURL=interaccion.schema.js.map