import { z } from 'zod';
import { registry } from '../lib/openapi';

export const CategoriaTrailerSchema = z.object({
  idCategoria: z.string().uuid(),
  nombre: z.string().min(1).max(100),
});

export const CreateCategoriaTrailerSchema = CategoriaTrailerSchema.omit({ idCategoria: true });
export const UpdateCategoriaTrailerSchema = CreateCategoriaTrailerSchema.partial();

const baseCategoriaTrailerPath = '/catalogs/categorias-trailer';

registry.registerPath({
  tags: ['Catalogos: CategoriaTrailer'],
  method: 'get',
  path: baseCategoriaTrailerPath,
  summary: 'List all trailer categories',
  responses: {
    200: {
      description: 'List of categories',
      content: { 'application/json': { schema: z.array(CategoriaTrailerSchema) } },
    },
  },
});

registry.registerPath({
  tags: ['Catalogos: CategoriaTrailer'],
  method: 'get',
  path: `${baseCategoriaTrailerPath}/{id}`,
  summary: 'Get category by ID',
  parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string', format: 'uuid' } }],
  responses: {
    200: {
      description: 'Category found',
      content: { 'application/json': { schema: CategoriaTrailerSchema } },
    },
    404: { description: 'Category not found' },
  },
});

registry.registerPath({
  tags: ['Catalogos: CategoriaTrailer'],
  method: 'post',
  path: baseCategoriaTrailerPath,
  summary: 'Create a new trailer category',
  security: [{ bearerAuth: [] }],
  request: {
    body: {
      content: { 'application/json': { schema: CreateCategoriaTrailerSchema } },
    },
  },
  responses: {
    201: {
      description: 'Category created',
      content: { 'application/json': { schema: CategoriaTrailerSchema } },
    },
  },
});

registry.registerPath({
  tags: ['Catalogos: CategoriaTrailer'],
  method: 'put',
  path: `${baseCategoriaTrailerPath}/{id}`,
  summary: 'Update a category',
  security: [{ bearerAuth: [] }],
  parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string', format: 'uuid' } }],
  request: {
    body: {
      content: { 'application/json': { schema: UpdateCategoriaTrailerSchema } },
    },
  },
  responses: {
    200: {
      description: 'Category updated',
      content: { 'application/json': { schema: CategoriaTrailerSchema } },
    },
  },
});

registry.registerPath({
  tags: ['Catalogos: CategoriaTrailer'],
  method: 'delete',
  path: `${baseCategoriaTrailerPath}/{id}`,
  summary: 'Delete a category',
  security: [{ bearerAuth: [] }],
  parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string', format: 'uuid' } }],
  responses: {
    204: { description: 'Category deleted' },
  },
});
