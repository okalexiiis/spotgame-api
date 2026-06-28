import { z } from 'zod';
import { registry } from '../lib/openapi';

export const QrGenerateResponseSchema = z.object({
  codigo: z.string().length(8),
  expiraEn: z.string(),
});

export const QrApproveRequestSchema = z.object({
  codigo: z.string().length(8).openapi({ example: 'ABC123XY' }),
});

export const QrStatusResponseSchema = z.object({
  estado: z.enum(['pendiente', 'aprobado', 'expirado', 'consumido']),
  token: z.string().nullable().openapi({ description: 'Provided only if status is approved' }),
});

const baseQrPath = '/qr-login';

registry.registerPath({
  tags: ['QR Login'],
  method: 'post',
  path: `${baseQrPath}/generate`,
  summary: 'Generate a QR login code (for TV client)',
  responses: {
    201: {
      description: 'Code generated',
      content: { 'application/json': { schema: QrGenerateResponseSchema } },
    },
  },
});

registry.registerPath({
  tags: ['QR Login'],
  method: 'post',
  path: `${baseQrPath}/approve`,
  summary: 'Approve a QR login code (for Mobile client)',
  security: [{ bearerAuth: [] }],
  request: { body: { content: { 'application/json': { schema: QrApproveRequestSchema } } } },
  responses: {
    200: { description: 'Code approved' },
    404: { description: 'Code not found or expired' },
  },
});

registry.registerPath({
  tags: ['QR Login'],
  method: 'get',
  path: `${baseQrPath}/status/{codigo}`,
  summary: 'Check the status of a QR login code',
  parameters: [{ name: 'codigo', in: 'path', required: true, schema: { type: 'string' } }],
  responses: {
    200: {
      description: 'Current status',
      content: { 'application/json': { schema: QrStatusResponseSchema } },
    },
  },
});
