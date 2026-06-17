"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthResponseSchema = exports.LoginSchema = exports.RegisterSchema = void 0;
const zod_to_openapi_1 = require("@asteasolutions/zod-to-openapi");
const zod_1 = require("zod");
const openapi_1 = require("../lib/openapi");
(0, zod_to_openapi_1.extendZodWithOpenApi)(zod_1.z);
exports.RegisterSchema = zod_1.z.object({
    nombre: zod_1.z.string().min(1).max(100).openapi({ example: 'John Doe' }),
    username: zod_1.z.string().min(3).max(50).openapi({ example: 'johndoe' }),
    correo: zod_1.z.string().email().max(150).openapi({ example: 'john@example.com' }),
    contrasena: zod_1.z.string().min(8).max(100).openapi({ example: 'password123' }),
});
exports.LoginSchema = zod_1.z.object({
    username: zod_1.z.string().min(1).openapi({ example: 'johndoe' }),
    contrasena: zod_1.z.string().min(1).openapi({ example: 'password123' }),
});
exports.AuthResponseSchema = zod_1.z.object({
    token: zod_1.z.string(),
    usuario: zod_1.z.object({
        idUsuario: zod_1.z.string().uuid(),
        nombre: zod_1.z.string(),
        username: zod_1.z.string().nullable(),
        correo: zod_1.z.string(),
    }),
});
openapi_1.registry.registerPath({
    tags: ['Auth'],
    method: 'post',
    path: '/auth/register',
    summary: 'Register a new user',
    request: {
        body: {
            content: {
                'application/json': {
                    schema: exports.RegisterSchema,
                },
            },
        },
    },
    responses: {
        201: {
            description: 'User registered successfully',
            content: {
                'application/json': {
                    schema: exports.AuthResponseSchema,
                },
            },
        },
        400: { description: 'Validation error' },
    },
});
openapi_1.registry.registerPath({
    tags: ['Auth'],
    method: 'post',
    path: '/auth/login',
    summary: 'Login to obtain an access token',
    request: {
        body: {
            content: {
                'application/json': {
                    schema: exports.LoginSchema,
                },
            },
        },
    },
    responses: {
        200: {
            description: 'Login successful',
            content: {
                'application/json': {
                    schema: exports.AuthResponseSchema,
                },
            },
        },
        401: { description: 'Invalid credentials' },
    },
});
//# sourceMappingURL=auth.schema.js.map