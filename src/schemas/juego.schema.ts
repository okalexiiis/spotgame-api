import { z } from 'zod';
import { registry } from '../lib/openapi';

export const JuegoSchema = z.object({
  idJuego: z.string().uuid(),
  titulo: z.string().min(1).max(200),
  slug: z.string().min(1).max(200),
  descripcion: z.string().nullable(),
  fechaLanzamiento: z.string().nullable(), // ISO string for the API
  desarrollador: z.string().nullable(),
  editor: z.string().nullable(),
  imagenPortada: z.string().nullable(),
  bannerUrl: z.string().nullable(),
  estado: z.enum(['anunciado', 'publicado']).nullable(),
  destacado: z.boolean(),
});

export const CreateJuegoSchema = JuegoSchema.omit({ idJuego: true });
export const UpdateJuegoSchema = CreateJuegoSchema.partial();

export const JuegoQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1).openapi({ example: 1 }),
  limit: z.coerce.number().int().min(1).max(100).default(10).openapi({ example: 10 }),
  search: z.string().optional().openapi({ example: 'Zelda' }),
  generoId: z.string().uuid().optional(),
  plataformaId: z.string().uuid().optional(),
});

// OpenAPI Path Registration
const baseJuegoPath = '/juegos';

registry.registerPath({
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
          schema: z.object({
            data: z.array(JuegoSchema),
            meta: z.object({
              total: z.number(),
              page: z.number(),
              limit: z.number(),
              totalPages: z.number(),
            }),
          }),
        },
      },
    },
  },
});


registry.registerPath({
  tags: ['Juegos'],
  method:
 'get',
  path: `${baseJuegoPath}/{id}`,
  summary: 'Get a game by ID',
  parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string', format: 'uuid' } }],
  responses: {
    200: {
      description: 'Game found',
      content: { 'application/json': { schema: JuegoSchema } },
    },
    404: { description: 'Game not found' },
  },
});

registry.registerPath({
  tags: ['Juegos'],
  method:
 'post',
  path: baseJuegoPath,
  summary: 'Create a new game',
  security: [{ bearerAuth: [] }],
  request: {
    body: {
      content: { 'application/json': { schema: CreateJuegoSchema } },
    },
  },
  responses: {
    201: {
      description: 'Game created',
      content: { 'application/json': { schema: JuegoSchema } },
    },
    401: { description: 'Unauthorized' },
  },
});

registry.registerPath({
  tags: ['Juegos'],
  method:
 'put',
  path: `${baseJuegoPath}/{id}`,
  summary: 'Update a game',
  security: [{ bearerAuth: [] }],
  parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string', format: 'uuid' } }],
  request: {
    body: {
      content: { 'application/json': { schema: UpdateJuegoSchema } },
    },
  },
  responses: {
    200: {
      description: 'Game updated',
      content: { 'application/json': { schema: JuegoSchema } },
    },
    404: { description: 'Game not found' },
  },
});

registry.registerPath({
  tags: ['Juegos'],
  method:
 'delete',
  path: `${baseJuegoPath}/{id}`,
  summary: 'Delete a game',
  security: [{ bearerAuth: [] }],
  parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string', format: 'uuid' } }],
  responses: {
    204: { description: 'Game deleted' },
    404: { description: 'Game not found' },
  },
});
