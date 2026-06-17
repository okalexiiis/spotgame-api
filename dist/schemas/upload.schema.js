"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PresignResponseSchema = exports.PresignRequestSchema = void 0;
const zod_1 = require("zod");
const openapi_1 = require("../lib/openapi");
exports.PresignRequestSchema = zod_1.z.object({
    filename: zod_1.z.string().min(1).openapi({ example: 'trailer.mp4' }),
    contentType: zod_1.z.string().min(1).openapi({ example: 'video/mp4' }),
    folder: zod_1.z.enum(['avatars', 'juegos', 'noticias', 'trailers/videos', 'trailers/posters'])
        .openapi({ example: 'trailers/videos' }),
});
exports.PresignResponseSchema = zod_1.z.object({
    presignedUrl: zod_1.z.string(),
    publicUrl: zod_1.z.string(),
    storageKey: zod_1.z.string(),
});
openapi_1.registry.registerPath({
    tags: ['Uploads'],
    method: 'post',
    path: '/upload/presign',
    summary: 'Generate a pre-signed URL for direct upload to R2',
    security: [{ bearerAuth: [] }],
    request: {
        body: {
            content: {
                'application/json': {
                    schema: exports.PresignRequestSchema,
                },
            },
        },
    },
    responses: {
        200: {
            description: 'Pre-signed URL generated',
            content: {
                'application/json': {
                    schema: exports.PresignResponseSchema,
                },
            },
        },
        401: { description: 'Unauthorized' },
    },
});
//# sourceMappingURL=upload.schema.js.map