"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateRolSchema = exports.CreateRolSchema = exports.RolSchema = void 0;
const zod_1 = require("zod");
const openapi_1 = require("../lib/openapi");
exports.RolSchema = zod_1.z.object({
    idRol: zod_1.z.string().uuid(),
    nombre: zod_1.z.string().min(1).max(50),
    descripcion: zod_1.z.string().nullable(),
});
exports.CreateRolSchema = exports.RolSchema.omit({ idRol: true });
exports.UpdateRolSchema = exports.CreateRolSchema.partial();
const baseRolPath = '/catalogs/roles';
openapi_1.registry.registerPath({
    tags: ['Catalogos: Rol'],
    method: 'get',
    path: baseRolPath,
    summary: 'List all roles',
    responses: {
        200: {
            description: 'List of roles',
            content: { 'application/json': { schema: zod_1.z.array(exports.RolSchema) } },
        },
    },
});
openapi_1.registry.registerPath({
    tags: ['Catalogos: Rol'],
    method: 'get',
    path: `${baseRolPath}/{id}`,
    summary: 'Get role by ID',
    parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string', format: 'uuid' } }],
    responses: {
        200: {
            description: 'Role found',
            content: { 'application/json': { schema: exports.RolSchema } },
        },
        404: { description: 'Role not found' },
    },
});
openapi_1.registry.registerPath({
    tags: ['Catalogos: Rol'],
    method: 'post',
    path: baseRolPath,
    summary: 'Create a new role',
    security: [{ bearerAuth: [] }],
    request: {
        body: {
            content: { 'application/json': { schema: exports.CreateRolSchema } },
        },
    },
    responses: {
        201: {
            description: 'Role created',
            content: { 'application/json': { schema: exports.RolSchema } },
        },
        401: { description: 'Unauthorized' },
    },
});
openapi_1.registry.registerPath({
    tags: ['Catalogos: Rol'],
    method: 'put',
    path: `${baseRolPath}/{id}`,
    summary: 'Update a role',
    security: [{ bearerAuth: [] }],
    parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string', format: 'uuid' } }],
    request: {
        body: {
            content: { 'application/json': { schema: exports.UpdateRolSchema } },
        },
    },
    responses: {
        200: {
            description: 'Role updated',
            content: { 'application/json': { schema: exports.RolSchema } },
        },
        404: { description: 'Role not found' },
    },
});
openapi_1.registry.registerPath({
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
//# sourceMappingURL=rol.schema.js.map