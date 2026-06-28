import { z } from 'zod';
import { registry } from '../lib/openapi';

export const UsuarioPublicSchema = z.object({
  idUsuario: z.string().uuid(),
  nombre: z.string(),
  username: z.string().nullable(),
  fechaRegistro: z.string(),
  estado: z.boolean(),
});

export const UsuarioDetailSchema = UsuarioPublicSchema.extend({
  roles: z.array(z.object({ rol: z.object({ nombre: z.string() }) })),
});

const base = '/usuarios';

registry.registerPath({
  tags: ['Usuarios'],
  method: 'get',
  path: base,
  summary: 'List all users',
  security: [{ bearerAuth: [] }],
  responses: {
    200: {
      description: 'List of users',
      content: { 'application/json': { schema: z.array(UsuarioPublicSchema) } },
    },
  },
});

registry.registerPath({
  tags: ['Usuarios'],
  method: 'get',
  path: `${base}/{id}`,
  summary: 'Get user by ID',
  security: [{ bearerAuth: [] }],
  parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string', format: 'uuid' } }],
  responses: {
    200: {
      description: 'User found',
      content: { 'application/json': { schema: UsuarioDetailSchema } },
    },
    404: { description: 'User not found' },
  },
});
