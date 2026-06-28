import { z } from 'zod';
import { registry } from '../lib/openapi';

// ProximoLanzamiento
export const ProximoLanzamientoSchema = z.object({
  idLanzamiento: z.string().uuid(),
  idJuego: z.string().uuid(),
  fechaLanzamiento: z.string().nullable(),
  ventanaLanzamiento: z.string().nullable(),
  descripcion: z.string().nullable(),
  bannerUrl: z.string().nullable(),
  destacado: z.boolean(),
});

export const CreateLanzamientoSchema = ProximoLanzamientoSchema.omit({ idLanzamiento: true });
export const UpdateLanzamientoSchema = CreateLanzamientoSchema.partial();

// Relations request schemas
export const LinkGeneroSchema = z.object({ idGenero: z.string().uuid() });
export const LinkPlataformaSchema = z.object({ idPlataforma: z.string().uuid() });
export const LinkCategoriaSchema = z.object({ idCategoria: z.string().uuid() });
export const LinkRolSchema = z.object({ idRol: z.string().uuid() });

export const AddImagenNoticiaSchema = z.object({
  urlImagen: z.string().url(),
  orden: z.number().int().default(0),
  leyenda: z.string().max(255).nullable(),
});

// Paths for ProximoLanzamiento
const launchPath = '/proximos-lanzamientos';
registry.registerPath({
  tags: ['Proximos Lanzamientos'],
  method: 'get',
  path: launchPath,
  summary: 'List all upcoming releases',
  responses: { 200: { description: 'List of launches', content: { 'application/json': { schema: z.array(ProximoLanzamientoSchema) } } } },
});

registry.registerPath({
  tags: ['Proximos Lanzamientos'],
  method: 'post',
  path: launchPath,
  summary: 'Create an upcoming release entry',
  security: [{ bearerAuth: [] }],
  request: { body: { content: { 'application/json': { schema: CreateLanzamientoSchema } } } },
  responses: { 201: { description: 'Launch entry created' } },
});

// Juegos Sub-resources
registry.registerPath({
  tags: ['Juegos'],
  method: 'post',
  path: '/juegos/{id}/generos',
  summary: 'Link a genre to a game',
  security: [{ bearerAuth: [] }],
  parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string', format: 'uuid' } }],
  request: { body: { content: { 'application/json': { schema: LinkGeneroSchema } } } },
  responses: { 201: { description: 'Genre linked' } },
});

registry.registerPath({
  tags: ['Juegos'],
  method: 'post',
  path: '/juegos/{id}/plataformas',
  summary: 'Link a platform to a game',
  security: [{ bearerAuth: [] }],
  parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string', format: 'uuid' } }],
  request: { body: { content: { 'application/json': { schema: LinkPlataformaSchema } } } },
  responses: { 201: { description: 'Platform linked' } },
});

// Trailers Sub-resources
registry.registerPath({
  tags: ['Trailers'],
  method: 'post',
  path: '/trailers/{id}/categorias',
  summary: 'Link a category to a trailer',
  security: [{ bearerAuth: [] }],
  parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string', format: 'uuid' } }],
  request: { body: { content: { 'application/json': { schema: LinkCategoriaSchema } } } },
  responses: { 201: { description: 'Category linked' } },
});

// Noticias Sub-resources
registry.registerPath({
  tags: ['Noticias'],
  method: 'post',
  path: '/noticias/{id}/imagenes',
  summary: 'Add an image to a news article gallery',
  security: [{ bearerAuth: [] }],
  parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string', format: 'uuid' } }],
  request: { body: { content: { 'application/json': { schema: AddImagenNoticiaSchema } } } },
  responses: { 201: { description: 'Image added' } },
});

// Usuarios Sub-resources
registry.registerPath({
  tags: ['Usuarios'],
  method: 'post',
  path: '/usuarios/{id}/roles',
  summary: 'Assign a role to a user',
  security: [{ bearerAuth: [] }],
  parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string', format: 'uuid' } }],
  request: { body: { content: { 'application/json': { schema: LinkRolSchema } } } },
  responses: { 201: { description: 'Role assigned' } },
});

// ============================================================================
// Missing OpenAPI paths (Phase 3)
// ============================================================================

registry.registerPath({
  tags: ['Proximos Lanzamientos'],
  method: 'get',
  path: `${launchPath}/{id}`,
  summary: 'Get launch entry by ID',
  parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string', format: 'uuid' } }],
  responses: { 200: { description: 'Launch entry', content: { 'application/json': { schema: ProximoLanzamientoSchema } } }, 404: { description: 'Not found' } },
});

registry.registerPath({
  tags: ['Proximos Lanzamientos'],
  method: 'put',
  path: `${launchPath}/{id}`,
  summary: 'Update a launch entry',
  security: [{ bearerAuth: [] }],
  parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string', format: 'uuid' } }],
  request: { body: { content: { 'application/json': { schema: UpdateLanzamientoSchema } } } },
  responses: { 200: { description: 'Launch entry updated' } },
});

registry.registerPath({
  tags: ['Proximos Lanzamientos'],
  method: 'delete',
  path: `${launchPath}/{id}`,
  summary: 'Delete a launch entry',
  security: [{ bearerAuth: [] }],
  parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string', format: 'uuid' } }],
  responses: { 204: { description: 'Launch entry deleted' } },
});

registry.registerPath({
  tags: ['Juegos'],
  method: 'delete',
  path: '/juegos/{id}/generos',
  summary: 'Remove a genre link from a game',
  security: [{ bearerAuth: [] }],
  parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string', format: 'uuid' } }],
  request: { body: { content: { 'application/json': { schema: LinkGeneroSchema } } } },
  responses: { 204: { description: 'Genre link removed' } },
});

registry.registerPath({
  tags: ['Juegos'],
  method: 'delete',
  path: '/juegos/{id}/plataformas',
  summary: 'Remove a platform link from a game',
  security: [{ bearerAuth: [] }],
  parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string', format: 'uuid' } }],
  request: { body: { content: { 'application/json': { schema: LinkPlataformaSchema } } } },
  responses: { 204: { description: 'Platform link removed' } },
});

registry.registerPath({
  tags: ['Trailers'],
  method: 'delete',
  path: '/trailers/{id}/categorias',
  summary: 'Remove a category link from a trailer',
  security: [{ bearerAuth: [] }],
  parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string', format: 'uuid' } }],
  request: { body: { content: { 'application/json': { schema: LinkCategoriaSchema } } } },
  responses: { 204: { description: 'Category link removed' } },
});

registry.registerPath({
  tags: ['Noticias'],
  method: 'delete',
  path: '/noticias/{id}/imagenes/{idImagen}',
  summary: 'Remove an image from a news article gallery',
  security: [{ bearerAuth: [] }],
  parameters: [
    { name: 'id', in: 'path', required: true, schema: { type: 'string', format: 'uuid' } },
    { name: 'idImagen', in: 'path', required: true, schema: { type: 'string', format: 'uuid' } },
  ],
  responses: { 204: { description: 'Image removed' } },
});

registry.registerPath({
  tags: ['Usuarios'],
  method: 'delete',
  path: '/usuarios/{id}/roles',
  summary: 'Remove a role from a user',
  security: [{ bearerAuth: [] }],
  parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string', format: 'uuid' } }],
  request: { body: { content: { 'application/json': { schema: LinkRolSchema } } } },
  responses: { 204: { description: 'Role removed' } },
});
