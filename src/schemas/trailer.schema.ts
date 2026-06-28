import { z } from 'zod';
import { registry } from '../lib/openapi';

export const TrailerSchema = z.object({
  idTrailer: z.string().uuid(),
  idJuego: z.string().uuid(),
  titulo: z.string().min(1).max(200),
  tipo: z.string().nullable(),
  urlVideo: z.string().nullable(),
  urlPoster: z.string().nullable(),
  orden: z.number().int().default(0),
  subidoPor: z.string().uuid().nullable(),
  estadoRevision: z.enum(['pendiente', 'aprobado', 'rechazado']).default('pendiente'),
  motivoRechazo: z.string().nullable(),
  estadoArchivo: z.enum(['subiendo', 'disponible', 'error']).default('subiendo'),
  storageKey: z.string().nullable(),
  duracionSegundos: z.number().int().nullable(),
  vistas: z.number().int().default(0),
});

export const CreateTrailerSchema = TrailerSchema.omit({ idTrailer: true, vistas: true });

export const UpdateTrailerSchema = z.object({
  titulo: z.string().min(1).max(200).optional(),
  urlPoster: z.string().nullable().optional(),
  tipo: z.string().nullable().optional(),
  duracionSegundos: z.number().int().nullable().optional(),
});

export const ModerateTrailerSchema = z.object({
  estadoRevision: z.enum(['pendiente', 'aprobado', 'rechazado']),
  motivoRechazo: z.string().nullable().optional(),
  vistas: z.number().int().min(0).optional(),
});

const baseTrailerPath = '/trailers';

registry.registerPath({
  tags: ['Trailers'],
  method:
 'get',
  path: baseTrailerPath,
  summary: 'List all trailers',
  responses: {
    200: {
      description: 'List of trailers',
      content: { 'application/json': { schema: z.array(TrailerSchema) } },
    },
  },
});

registry.registerPath({
  tags: ['Trailers'],
  method:
 'get',
  path: `${baseTrailerPath}/{id}`,
  summary: 'Get trailer by ID',
  parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string', format: 'uuid' } }],
  responses: {
    200: {
      description: 'Trailer found',
      content: { 'application/json': { schema: TrailerSchema } },
    },
    404: { description: 'Trailer not found' },
  },
});

registry.registerPath({
  tags: ['Trailers'],
  method:
 'post',
  path: baseTrailerPath,
  summary: 'Create a new trailer',
  security: [{ bearerAuth: [] }],
  request: {
    body: {
      content: { 'application/json': { schema: CreateTrailerSchema } },
    },
  },
  responses: {
    201: {
      description: 'Trailer created',
      content: { 'application/json': { schema: TrailerSchema } },
    },
  },
});

registry.registerPath({
  tags: ['Trailers'],
  method:
 'put',
  path: `${baseTrailerPath}/{id}`,
  summary: 'Update a trailer',
  security: [{ bearerAuth: [] }],
  parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string', format: 'uuid' } }],
  request: {
    body: {
      content: { 'application/json': { schema: UpdateTrailerSchema } },
    },
  },
  responses: {
    200: {
      description: 'Trailer updated',
      content: { 'application/json': { schema: TrailerSchema } },
    },
  },
});

registry.registerPath({
  tags: ['Trailers'],
  method:
 'delete',
  path: `${baseTrailerPath}/{id}`,
  summary: 'Delete a trailer',
  security: [{ bearerAuth: [] }],
  parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string', format: 'uuid' } }],
  responses: {
    204: { description: 'Trailer deleted' },
  },
});

registry.registerPath({
  tags: ['Trailers'],
  method: 'patch',
  path: `${baseTrailerPath}/{id}/moderate`,
  summary: 'Moderate a trailer (admin only)',
  security: [{ bearerAuth: [] }],
  parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string', format: 'uuid' } }],
  request: {
    body: {
      content: { 'application/json': { schema: ModerateTrailerSchema } },
    },
  },
  responses: {
    200: {
      description: 'Trailer moderated',
      content: { 'application/json': { schema: TrailerSchema } },
    },
  },
});
