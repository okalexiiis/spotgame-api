import { z } from 'zod';
import { registry } from '../lib/openapi';

export const IdiomaSchema = z.object({
  idIdioma: z.string().uuid(),
  codigo: z.string().min(1).max(10),
  nombre: z.string().min(1).max(100),
  banderaUrl: z.string().nullable(),
  activo: z.boolean(),
});

export const CreateIdiomaSchema = IdiomaSchema.omit({ idIdioma: true });
export const UpdateIdiomaSchema = CreateIdiomaSchema.partial();

const baseIdiomaPath = '/catalogs/idiomas';

registry.registerPath({
  tags: ['Catalogos: Idioma'],
  method: 'get',
  path: baseIdiomaPath,
  summary: 'List all languages',
  responses: {
    200: {
      description: 'List of languages',
      content: { 'application/json': { schema: z.array(IdiomaSchema) } },
    },
  },
});

registry.registerPath({
  tags: ['Catalogos: Idioma'],
  method: 'get',
  path: `${baseIdiomaPath}/{id}`,
  summary: 'Get language by ID',
  parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string', format: 'uuid' } }],
  responses: {
    200: {
      description: 'Language found',
      content: { 'application/json': { schema: IdiomaSchema } },
    },
    404: { description: 'Language not found' },
  },
});

registry.registerPath({
  tags: ['Catalogos: Idioma'],
  method: 'post',
  path: baseIdiomaPath,
  summary: 'Create a new language',
  security: [{ bearerAuth: [] }],
  request: {
    body: {
      content: { 'application/json': { schema: CreateIdiomaSchema } },
    },
  },
  responses: {
    201: {
      description: 'Language created',
      content: { 'application/json': { schema: IdiomaSchema } },
    },
  },
});

registry.registerPath({
  tags: ['Catalogos: Idioma'],
  method: 'put',
  path: `${baseIdiomaPath}/{id}`,
  summary: 'Update a language',
  security: [{ bearerAuth: [] }],
  parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string', format: 'uuid' } }],
  request: {
    body: {
      content: { 'application/json': { schema: UpdateIdiomaSchema } },
    },
  },
  responses: {
    200: {
      description: 'Language updated',
      content: { 'application/json': { schema: IdiomaSchema } },
    },
  },
});

registry.registerPath({
  tags: ['Catalogos: Idioma'],
  method: 'delete',
  path: `${baseIdiomaPath}/{id}`,
  summary: 'Delete a language',
  security: [{ bearerAuth: [] }],
  parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string', format: 'uuid' } }],
  responses: {
    204: { description: 'Language deleted' },
  },
});
