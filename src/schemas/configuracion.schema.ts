import { z } from 'zod';
import { registry } from '../lib/openapi';

export const ConfiguracionUsuarioSchema = z.object({
  tema: z.string().max(20).nullable().openapi({ example: 'dark' }),
  emailNotificaciones: z.boolean().default(true),
  notificacionesPush: z.boolean().default(true),
  privacidadPerfil: z.string().max(20).nullable().openapi({ example: 'public' }),
  controlParental: z.boolean().default(false),
  calidadVideo: z.string().max(20).default('auto').openapi({ example: '1080p' }),
  tamanoTexto: z.string().max(20).default('normal').openapi({ example: 'normal' }),
  idiomaId: z.string().uuid().nullable(),
});

export const UpdateConfiguracionSchema = ConfiguracionUsuarioSchema.partial();

const baseConfigPath = '/me/configuracion';

registry.registerPath({
  tags: ['User Features'],
  method: 'get',
  path: baseConfigPath,
  summary: 'Get my configuration',
  security: [{ bearerAuth: [] }],
  responses: {
    200: {
      description: 'Your configuration',
      content: { 'application/json': { schema: ConfiguracionUsuarioSchema } },
    },
    401: { description: 'Unauthorized' },
  },
});

registry.registerPath({
  tags: ['User Features'],
  method: 'put',
  path: baseConfigPath,
  summary: 'Update my configuration',
  security: [{ bearerAuth: [] }],
  request: {
    body: {
      content: { 'application/json': { schema: UpdateConfiguracionSchema } },
    },
  },
  responses: {
    200: {
      description: 'Configuration updated',
      content: { 'application/json': { schema: ConfiguracionUsuarioSchema } },
    },
    401: { description: 'Unauthorized' },
  },
});
