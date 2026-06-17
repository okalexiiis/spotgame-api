import { z } from 'zod';
export declare const PlataformaSchema: z.ZodObject<{
    idPlataforma: z.ZodString;
    nombre: z.ZodString;
    tipo: z.ZodNullable<z.ZodString>;
    iconoUrl: z.ZodNullable<z.ZodString>;
}, z.core.$strip>;
export declare const CreatePlataformaSchema: z.ZodObject<{
    nombre: z.ZodString;
    tipo: z.ZodNullable<z.ZodString>;
    iconoUrl: z.ZodNullable<z.ZodString>;
}, z.core.$strip>;
export declare const UpdatePlataformaSchema: z.ZodObject<{
    nombre: z.ZodOptional<z.ZodString>;
    tipo: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    iconoUrl: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, z.core.$strip>;
