import { z } from 'zod';
export declare const PresignRequestSchema: z.ZodObject<{
    filename: z.ZodString;
    contentType: z.ZodString;
    folder: z.ZodEnum<{
        avatars: "avatars";
        juegos: "juegos";
        noticias: "noticias";
        "trailers/videos": "trailers/videos";
        "trailers/posters": "trailers/posters";
    }>;
}, z.core.$strip>;
export declare const PresignResponseSchema: z.ZodObject<{
    presignedUrl: z.ZodString;
    publicUrl: z.ZodString;
    storageKey: z.ZodString;
}, z.core.$strip>;
