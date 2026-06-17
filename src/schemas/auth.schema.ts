import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { z } from 'zod';
import { registry } from '../lib/openapi';

extendZodWithOpenApi(z);

export const RegisterSchema = z.object({
  nombre: z.string().min(1).max(100).openapi({ example: 'John Doe' }),
  username: z.string().min(3).max(50).openapi({ example: 'johndoe' }),
  correo: z.string().email().max(150).openapi({ example: 'john@example.com' }),
  contrasena: z.string().min(8).max(100).openapi({ example: 'password123' }),
});

export const LoginSchema = z.object({
  username: z.string().min(1).openapi({ example: 'johndoe' }),
  contrasena: z.string().min(1).openapi({ example: 'password123' }),
});

export const AuthResponseSchema = z.object({
  token: z.string(),
  usuario: z.object({
    idUsuario: z.string().uuid(),
    nombre: z.string(),
    username: z.string().nullable(),
    correo: z.string(),
  }),
});

// Register paths for OpenAPI
registry.registerPath({
  tags: ['Auth'],
  method: 'post',
  path: '/auth/register',
  summary: 'Register a new user',
  request: {
    body: {
      content: {
        'application/json': {
          schema: RegisterSchema,
        },
      },
    },
  },
  responses: {
    201: {
      description: 'User registered successfully',
      content: {
        'application/json': {
          schema: AuthResponseSchema,
        },
      },
    },
    400: { description: 'Validation error' },
  },
});

registry.registerPath({
  tags: ['Auth'],
  method: 'post',
  path: '/auth/login',
  summary: 'Login to obtain an access token',
  request: {
    body: {
      content: {
        'application/json': {
          schema: LoginSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: 'Login successful',
      content: {
        'application/json': {
          schema: AuthResponseSchema,
        },
      },
    },
    401: { description: 'Invalid credentials' },
  },
});
