import { z } from 'zod';
import { registry } from '../lib/openapi';

export const NotificacionSchema = z.object({
  idNotificacion: z.string().uuid(),
  titulo: z.string(),
  mensaje: z.string(),
  tipo: z.string().nullable(),
  leida: z.boolean(),
  fechaCreacion: z.string(),
  entidad: z.string().nullable(),
  entidadId: z.string().uuid().nullable(),
});

const baseNotifPath = '/me/notificaciones';

registry.registerPath({
  tags: ['User Features'],
  method: 'get',
  path: baseNotifPath,
  summary: 'List my notifications',
  security: [{ bearerAuth: [] }],
  responses: {
    200: {
      description: 'List of notifications',
      content: { 'application/json': { schema: z.array(NotificacionSchema) } },
    },
  },
});

registry.registerPath({
  tags: ['User Features'],
  method: 'patch',
  path: `${baseNotifPath}/{id}/read`,
  summary: 'Mark a notification as read',
  security: [{ bearerAuth: [] }],
  parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string', format: 'uuid' } }],
  responses: {
    200: { description: 'Marked as read' },
  },
});

registry.registerPath({
  tags: ['User Features'],
  method: 'patch',
  path: `${baseNotifPath}/read-all`,
  summary: 'Mark all notifications as read',
  security: [{ bearerAuth: [] }],
  responses: {
    200: { description: 'All marked as read' },
  },
});
