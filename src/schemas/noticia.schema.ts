import { z } from 'zod';
import { registry } from '../lib/openapi';

export const NoticiaSchema = z.object({
  idNoticia: z.string().uuid(),
  titulo: z.string().min(1).max(200),
  slug: z.string().min(1).max(200),
  resumen: z.string().nullable(),
  contenido: z.string().min(1),
  imagenPortada: z.string().nullable(),
  fechaPublicacion: z.string().nullable(),
  autorId: z.string().uuid().nullable(),
  destacada: z.boolean(),
});

export const CreateNoticiaSchema = NoticiaSchema.omit({ idNoticia: true });
export const UpdateNoticiaSchema = CreateNoticiaSchema.partial();

export const NoticiaQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1).openapi({ example: 1 }),
  limit: z.coerce.number().int().min(1).max(100).default(10).openapi({ example: 10 }),
  search: z.string().optional().openapi({ example: 'Update' }),
});

const baseNoticiaPath = '/noticias';

registry.registerPath({
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
          schema: z.object({
            data: z.array(NoticiaSchema),
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
  tags: ['Noticias'],
  method:
 'get',
  path: `${baseNoticiaPath}/{id}`,
  summary: 'Get news by ID',
  parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string', format: 'uuid' } }],
  responses: {
    200: {
      description: 'News found',
      content: { 'application/json': { schema: NoticiaSchema } },
    },
    404: { description: 'News not found' },
  },
});

registry.registerPath({
  tags: ['Noticias'],
  method:
 'post',
  path: baseNoticiaPath,
  summary: 'Create a news article',
  security: [{ bearerAuth: [] }],
  request: {
    body: {
      content: { 'application/json': { schema: CreateNoticiaSchema } },
    },
  },
  responses: {
    201: {
      description: 'News created',
      content: { 'application/json': { schema: NoticiaSchema } },
    },
  },
});

registry.registerPath({
  tags: ['Noticias'],
  method:
 'put',
  path: `${baseNoticiaPath}/{id}`,
  summary: 'Update news article',
  security: [{ bearerAuth: [] }],
  parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string', format: 'uuid' } }],
  request: {
    body: {
      content: { 'application/json': { schema: UpdateNoticiaSchema } },
    },
  },
  responses: {
    200: {
      description: 'News updated',
      content: { 'application/json': { schema: NoticiaSchema } },
    },
  },
});

registry.registerPath({
  tags: ['Noticias'],
  method:
 'delete',
  path: `${baseNoticiaPath}/{id}`,
  summary: 'Delete news article',
  security: [{ bearerAuth: [] }],
  parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string', format: 'uuid' } }],
  responses: {
    204: { description: 'News deleted' },
  },
});
