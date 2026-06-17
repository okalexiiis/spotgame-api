import { z } from 'zod';
import { registry } from '../lib/openapi';

export const RolSchema = z.object({
  idRol: z.string().uuid(),
  nombre: z.string().min(1).max(50),
  descripcion: z.string().nullable(),
});

export const CreateRolSchema = RolSchema.omit({ idRol: true });
export const UpdateRolSchema = CreateRolSchema.partial();

const baseRolPath = '/catalogs/roles';

registry.registerPath({
  tags: ['Catalogos: Rol'],
  method: 'get',
  path: baseRolPath,
  summary: 'List all roles',
  responses: {
    200: {
      description: 'List of roles',
      content: { 'application/json': { schema: z.array(RolSchema) } },
    },
  },
});

registry.registerPath({
  tags: ['Catalogos: Rol'],
  method: 'get',
  path: `${baseRolPath}/{id}`,
  summary: 'Get role by ID',
  parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string', format: 'uuid' } }],
  responses: {
    200: {
      description: 'Role found',
      content: { 'application/json': { schema: RolSchema } },
    },
    404: { description: 'Role not found' },
  },
});

registry.registerPath({
  tags: ['Catalogos: Rol'],
  method: 'post',
  path: baseRolPath,
  summary: 'Create a new role',
  security: [{ bearerAuth: [] }],
  request: {
    body: {
      content: { 'application/json': { schema: CreateRolSchema } },
    },
  },
  responses: {
    201: {
      description: 'Role created',
      content: { 'application/json': { schema: RolSchema } },
    },
    401: { description: 'Unauthorized' },
  },
});

registry.registerPath({
  tags: ['Catalogos: Rol'],
  method: 'put',
  path: `${baseRolPath}/{id}`,
  summary: 'Update a role',
  security: [{ bearerAuth: [] }],
  parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string', format: 'uuid' } }],
  request: {
    body: {
      content: { 'application/json': { schema: UpdateRolSchema } },
    },
  },
  responses: {
    200: {
      description: 'Role updated',
      content: { 'application/json': { schema: RolSchema } },
    },
    404: { description: 'Role not found' },
  },
});

registry.registerPath({
  tags: ['Catalogos: Rol'],
  method: 'delete',
  path: `${baseRolPath}/{id}`,
  summary: 'Delete a role',
  security: [{ bearerAuth: [] }],
  parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string', format: 'uuid' } }],
  responses: {
    204: { description: 'Role deleted' },
    404: { description: 'Role not found' },
  },
});
