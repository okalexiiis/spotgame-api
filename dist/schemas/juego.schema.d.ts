import { z } from 'zod';
export declare const JuegoSchema: z.ZodObject<{
    idJuego: z.ZodString;
    titulo: z.ZodString;
    slug: z.ZodString;
    descripcion: z.ZodNullable<z.ZodString>;
    fechaLanzamiento: z.ZodNullable<z.ZodString>;
    desarrollador: z.ZodNullable<z.ZodString>;
    editor: z.ZodNullable<z.ZodString>;
    imagenPortada: z.ZodNullable<z.ZodString>;
    bannerUrl: z.ZodNullable<z.ZodString>;
    estado: z.ZodNullable<z.ZodString>;
    destacado: z.ZodBoolean;
}, z.core.$strip>;
export declare const CreateJuegoSchema: z.ZodObject<{
    descripcion: z.ZodNullable<z.ZodString>;
    estado: z.ZodNullable<z.ZodString>;
    titulo: z.ZodString;
    slug: z.ZodString;
    fechaLanzamiento: z.ZodNullable<z.ZodString>;
    desarrollador: z.ZodNullable<z.ZodString>;
    editor: z.ZodNullable<z.ZodString>;
    imagenPortada: z.ZodNullable<z.ZodString>;
    bannerUrl: z.ZodNullable<z.ZodString>;
    destacado: z.ZodBoolean;
}, z.core.$strip>;
export declare const UpdateJuegoSchema: z.ZodObject<{
    descripcion: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    estado: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    titulo: z.ZodOptional<z.ZodString>;
    slug: z.ZodOptional<z.ZodString>;
    fechaLanzamiento: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    desarrollador: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    editor: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    imagenPortada: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    bannerUrl: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    destacado: z.ZodOptional<z.ZodBoolean>;
}, z.core.$strip>;
export declare const JuegoQuerySchema: z.ZodObject<{
    page: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    limit: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    search: z.ZodOptional<z.ZodString>;
    generoId: z.ZodOptional<z.ZodString>;
    plataformaId: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
