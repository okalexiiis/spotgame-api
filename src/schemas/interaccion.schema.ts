import { z } from 'zod';
import { registry } from '../lib/openapi';

export const FavoritoSchema = z.object({
  idFavorito: z.string().uuid(),
  idJuego: z.string().uuid(),
  fechaAgregado: z.string(),
});

export const AddFavoritoSchema = z.object({
  idJuego: z.string().uuid().openapi({ example: 'uuid-of-game' }),
});

export const DescargaSchema = z.object({
  idDescarga: z.string().uuid(),
  idJuego: z.string().uuid(),
  fechaDescarga: z.string(),
  plataforma: z.string().nullable(),
});

export const LogDescargaSchema = z.object({
  idJuego: z.string().uuid(),
  plataforma: z.string().min(1).max(100).openapi({ example: 'PS5' }),
});

export const ReservaSchema = z.object({
  idReserva: z.string().uuid(),
  idLanzamiento: z.string().uuid(),
  fechaReserva: z.string(),
});

export const AddReservaSchema = z.object({
  idLanzamiento: z.string().uuid().openapi({ example: 'uuid-of-launch' }),
});

// Paths for User Interactions
const baseMePath = '/me';

// Favorites
registry.registerPath({
  tags: ['User Features'],
  method: 'get',
  path: `${baseMePath}/favoritos`,
  summary: 'List my favorite games',
  security: [{ bearerAuth: [] }],
  responses: {
    200: {
      description: 'List of favorites',
      content: { 'application/json': { schema: z.array(FavoritoSchema) } },
    },
  },
});

registry.registerPath({
  tags: ['User Features'],
  method: 'post',
  path: `${baseMePath}/favoritos`,
  summary: 'Add a game to favorites',
  security: [{ bearerAuth: [] }],
  request: { body: { content: { 'application/json': { schema: AddFavoritoSchema } } } },
  responses: {
    201: { description: 'Added to favorites' },
  },
});

registry.registerPath({
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

// Downloads
registry.registerPath({
  tags: ['User Features'],
  method: 'get',
  path: `${baseMePath}/descargas`,
  summary: 'List my download history',
  security: [{ bearerAuth: [] }],
  responses: {
    200: {
      description: 'List of downloads',
      content: { 'application/json': { schema: z.array(DescargaSchema) } },
    },
  },
});

registry.registerPath({
  tags: ['User Features'],
  method: 'post',
  path: `${baseMePath}/descargas`,
  summary: 'Log a game download',
  security: [{ bearerAuth: [] }],
  request: { body: { content: { 'application/json': { schema: LogDescargaSchema } } } },
  responses: {
    201: { description: 'Download logged' },
  },
});

// Reservations
registry.registerPath({
  tags: ['User Features'],
  method: 'get',
  path: `${baseMePath}/reservas`,
  summary: 'List my game reservations',
  security: [{ bearerAuth: [] }],
  responses: {
    200: {
      description: 'List of reservations',
      content: { 'application/json': { schema: z.array(ReservaSchema) } },
    },
  },
});

registry.registerPath({
  tags: ['User Features'],
  method: 'post',
  path: `${baseMePath}/reservas`,
  summary: 'Reserve an upcoming release',
  security: [{ bearerAuth: [] }],
  request: { body: { content: { 'application/json': { schema: AddReservaSchema } } } },
  responses: {
    201: { description: 'Reservation created' },
  },
});

registry.registerPath({
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
