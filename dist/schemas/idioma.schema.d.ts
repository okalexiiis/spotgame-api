import { z } from 'zod';
export declare const IdiomaSchema: z.ZodObject<{
    idIdioma: z.ZodString;
    codigo: z.ZodString;
    nombre: z.ZodString;
    banderaUrl: z.ZodNullable<z.ZodString>;
    activo: z.ZodBoolean;
}, z.core.$strip>;
export declare const CreateIdiomaSchema: z.ZodObject<{
    nombre: z.ZodString;
    codigo: z.ZodString;
    banderaUrl: z.ZodNullable<z.ZodString>;
    activo: z.ZodBoolean;
}, z.core.$strip>;
export declare const UpdateIdiomaSchema: z.ZodObject<{
    nombre: z.ZodOptional<z.ZodString>;
    codigo: z.ZodOptional<z.ZodString>;
    banderaUrl: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    activo: z.ZodOptional<z.ZodBoolean>;
}, z.core.$strip>;
