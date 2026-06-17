import { z } from 'zod';
export declare const RegisterSchema: z.ZodObject<{
    nombre: z.ZodString;
    username: z.ZodString;
    correo: z.ZodString;
    contrasena: z.ZodString;
}, z.core.$strip>;
export declare const LoginSchema: z.ZodObject<{
    username: z.ZodString;
    contrasena: z.ZodString;
}, z.core.$strip>;
export declare const AuthResponseSchema: z.ZodObject<{
    token: z.ZodString;
    usuario: z.ZodObject<{
        idUsuario: z.ZodString;
        nombre: z.ZodString;
        username: z.ZodNullable<z.ZodString>;
        correo: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>;
