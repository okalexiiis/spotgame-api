import { z } from 'zod';
import { registry } from '../lib/openapi';

export const PlataformaSchema = z.object({
  idPlataforma: z.string().uuid(),
  nombre: z.string().min(1).max(100),
  tipo: z.string().nullable(),
  iconoUrl: z.string().nullable(),
});

export const CreatePlataformaSchema = PlataformaSchema.omit({ idPlataforma: true });
export const UpdatePlataformaSchema = CreatePlataformaSchema.partial();

const basePlataformaPath = '/catalogs/plataformas';

registry.registerPath({
  tags: ['Catalogos: Plataforma'],
  method: 'get',
  path: basePlataformaPath,
  summary: 'List all platforms',
  responses: {
    200: {
      description: 'List of platforms',
      content: { 'application/json': { schema: z.array(PlataformaSchema) } },
    },
  },
});

registry.registerPath({
  tags: ['Catalogos: Plataforma'],
  method: 'get',
  path: `${basePlataformaPath}/{id}`,
  summary: 'Get platform by ID',
  parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string', format: 'uuid' } }],
  responses: {
    200: {
      description: 'Platform found',
      content: { 'application/json': { schema: PlataformaSchema } },
    },
    404: { description: 'Platform not found' },
  },
});

registry.registerPath({
  tags: ['Catalogos: Plataforma'],
  method: 'post',
  path: basePlataformaPath,
  summary: 'Create a new platform',
  security: [{ bearerAuth: [] }],
  request: {
    body: {
      content: { 'application/json': { schema: CreatePlataformaSchema } },
    },
  },
  responses: {
    201: {
      description: 'Platform created',
      content: { 'application/json': { schema: PlataformaSchema } },
    },
  },
});

registry.registerPath({
  tags: ['Catalogos: Plataforma'],
  method: 'put',
  path: `${basePlataformaPath}/{id}`,
  summary: 'Update a platform',
  security: [{ bearerAuth: [] }],
  parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string', format: 'uuid' } }],
  request: {
    body: {
      content: { 'application/json': { schema: UpdatePlataformaSchema } },
    },
  },
  responses: {
    200: {
      description: 'Platform updated',
      content: { 'application/json': { schema: PlataformaSchema } },
    },
  },
});

registry.registerPath({
  tags: ['Catalogos: Plataforma'],
  method: 'delete',
  path: `${basePlataformaPath}/{id}`,
  summary: 'Delete a platform',
  security: [{ bearerAuth: [] }],
  parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string', format: 'uuid' } }],
  responses: {
    204: { description: 'Platform deleted' },
  },
});
