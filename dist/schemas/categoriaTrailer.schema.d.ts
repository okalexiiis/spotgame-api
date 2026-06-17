import { z } from 'zod';
export declare const CategoriaTrailerSchema: z.ZodObject<{
    idCategoria: z.ZodString;
    nombre: z.ZodString;
}, z.core.$strip>;
export declare const CreateCategoriaTrailerSchema: z.ZodObject<{
    nombre: z.ZodString;
}, z.core.$strip>;
export declare const UpdateCategoriaTrailerSchema: z.ZodObject<{
    nombre: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
