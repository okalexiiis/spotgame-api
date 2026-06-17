import { z } from 'zod';
export declare const NoticiaSchema: z.ZodObject<{
    idNoticia: z.ZodString;
    titulo: z.ZodString;
    slug: z.ZodString;
    resumen: z.ZodNullable<z.ZodString>;
    contenido: z.ZodString;
    imagenPortada: z.ZodNullable<z.ZodString>;
    fechaPublicacion: z.ZodNullable<z.ZodString>;
    autorId: z.ZodNullable<z.ZodString>;
    destacada: z.ZodBoolean;
}, z.core.$strip>;
export declare const CreateNoticiaSchema: z.ZodObject<{
    titulo: z.ZodString;
    slug: z.ZodString;
    imagenPortada: z.ZodNullable<z.ZodString>;
    resumen: z.ZodNullable<z.ZodString>;
    contenido: z.ZodString;
    fechaPublicacion: z.ZodNullable<z.ZodString>;
    autorId: z.ZodNullable<z.ZodString>;
    destacada: z.ZodBoolean;
}, z.core.$strip>;
export declare const UpdateNoticiaSchema: z.ZodObject<{
    titulo: z.ZodOptional<z.ZodString>;
    slug: z.ZodOptional<z.ZodString>;
    imagenPortada: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    resumen: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    contenido: z.ZodOptional<z.ZodString>;
    fechaPublicacion: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    autorId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    destacada: z.ZodOptional<z.ZodBoolean>;
}, z.core.$strip>;
export declare const NoticiaQuerySchema: z.ZodObject<{
    page: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    limit: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    search: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
