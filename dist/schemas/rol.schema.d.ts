import { z } from 'zod';
export declare const RolSchema: z.ZodObject<{
    idRol: z.ZodString;
    nombre: z.ZodString;
    descripcion: z.ZodNullable<z.ZodString>;
}, z.core.$strip>;
export declare const CreateRolSchema: z.ZodObject<{
    nombre: z.ZodString;
    descripcion: z.ZodNullable<z.ZodString>;
}, z.core.$strip>;
export declare const UpdateRolSchema: z.ZodObject<{
    nombre: z.ZodOptional<z.ZodString>;
    descripcion: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, z.core.$strip>;
