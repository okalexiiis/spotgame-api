import { z } from 'zod';
export declare const GeneroSchema: z.ZodObject<{
    idGenero: z.ZodString;
    nombre: z.ZodString;
    descripcion: z.ZodNullable<z.ZodString>;
    iconoUrl: z.ZodNullable<z.ZodString>;
}, z.core.$strip>;
export declare const CreateGeneroSchema: z.ZodObject<{
    nombre: z.ZodString;
    descripcion: z.ZodNullable<z.ZodString>;
    iconoUrl: z.ZodNullable<z.ZodString>;
}, z.core.$strip>;
export declare const UpdateGeneroSchema: z.ZodObject<{
    nombre: z.ZodOptional<z.ZodString>;
    descripcion: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    iconoUrl: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, z.core.$strip>;
