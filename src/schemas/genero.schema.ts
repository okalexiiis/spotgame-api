import { z } from 'zod';
import { registry } from '../lib/openapi';

export const GeneroSchema = z.object({
  idGenero: z.string().uuid(),
  nombre: z.string().min(1).max(100),
  descripcion: z.string().nullable(),
  iconoUrl: z.string().nullable(),
});

export const CreateGeneroSchema = GeneroSchema.omit({ idGenero: true });
export const UpdateGeneroSchema = CreateGeneroSchema.partial();

const baseGeneroPath = '/catalogs/generos';

registry.registerPath({
  tags: ['Catalogos: Genero'],
  method: 'get',
  path: baseGeneroPath,
  summary: 'List all genres',
  responses: {
    200: {
      description: 'List of genres',
      content: { 'application/json': { schema: z.array(GeneroSchema) } },
    },
  },
});

registry.registerPath({
  tags: ['Catalogos: Genero'],
  method: 'get',
  path: `${baseGeneroPath}/{id}`,
  summary: 'Get genre by ID',
  parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string', format: 'uuid' } }],
  responses: {
    200: {
      description: 'Genre found',
      content: { 'application/json': { schema: GeneroSchema } },
    },
    404: { description: 'Genre not found' },
  },
});

registry.registerPath({
  tags: ['Catalogos: Genero'],
  method: 'post',
  path: baseGeneroPath,
  summary: 'Create a new genre',
  security: [{ bearerAuth: [] }],
  request: {
    body: {
      content: { 'application/json': { schema: CreateGeneroSchema } },
    },
  },
  responses: {
    201: {
      description: 'Genre created',
      content: { 'application/json': { schema: GeneroSchema } },
    },
  },
});

registry.registerPath({
  tags: ['Catalogos: Genero'],
  method: 'put',
  path: `${baseGeneroPath}/{id}`,
  summary: 'Update a genre',
  security: [{ bearerAuth: [] }],
  parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string', format: 'uuid' } }],
  request: {
    body: {
      content: { 'application/json': { schema: UpdateGeneroSchema } },
    },
  },
  responses: {
    200: {
      description: 'Genre updated',
      content: { 'application/json': { schema: GeneroSchema } },
    },
  },
});

registry.registerPath({
  tags: ['Catalogos: Genero'],
  method: 'delete',
  path: `${baseGeneroPath}/{id}`,
  summary: 'Delete a genre',
  security: [{ bearerAuth: [] }],
  parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string', format: 'uuid' } }],
  responses: {
    204: { description: 'Genre deleted' },
  },
});
