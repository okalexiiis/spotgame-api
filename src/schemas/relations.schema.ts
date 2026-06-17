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
