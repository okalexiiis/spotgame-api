import { z } from 'zod';
import { registry } from '../lib/openapi';

export const PresignRequestSchema = z.object({
  filename: z.string().min(1).openapi({ example: 'trailer.mp4' }),
  contentType: z.string().min(1).openapi({ example: 'video/mp4' }),
  folder: z.enum(['avatars', 'juegos', 'noticias', 'trailers/videos', 'trailers/posters'])
    .openapi({ example: 'trailers/videos' }),
});

export const PresignResponseSchema = z.object({
  presignedUrl: z.string(),
  publicUrl: z.string(),
  storageKey: z.string(),
});

registry.registerPath({
  tags: ['Uploads'],
  method: 'post',
  path: '/upload/presign',
  summary: 'Generate a pre-signed URL for direct upload to R2',
  security: [{ bearerAuth: [] }],
  request: {
    body: {
      content: {
        'application/json': {
          schema: PresignRequestSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: 'Pre-signed URL generated',
      content: {
        'application/json': {
          schema: PresignResponseSchema,
        },
      },
    },
    401: { description: 'Unauthorized' },
  },
});
