import { z } from 'zod';
import { registry } from '../lib/openapi';

export const LogActividadSchema = z.object({
  idLog: z.string().uuid(),
  accion: z.string(),
  entidad: z.string(),
  entidadId: z.string().uuid().nullable(),
  detalles: z.any().nullable(),
  ipAddress: z.string().nullable(),
  fecha: z.string(),
});

registry.registerPath({
  tags: ['User Features'],
  method: 'get',
  path: '/me/logs',
  summary: 'List my activity logs',
  security: [{ bearerAuth: [] }],
  responses: {
    200: {
      description: 'List of activity logs',
      content: { 'application/json': { schema: z.array(LogActividadSchema) } },
    },
  },
});
