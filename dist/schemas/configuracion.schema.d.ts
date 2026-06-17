import { z } from 'zod';
export declare const ConfiguracionUsuarioSchema: z.ZodObject<{
    tema: z.ZodNullable<z.ZodString>;
    emailNotificaciones: z.ZodDefault<z.ZodBoolean>;
    notificacionesPush: z.ZodDefault<z.ZodBoolean>;
    privacidadPerfil: z.ZodNullable<z.ZodString>;
    controlParental: z.ZodDefault<z.ZodBoolean>;
    calidadVideo: z.ZodDefault<z.ZodString>;
    tamanoTexto: z.ZodDefault<z.ZodString>;
    idiomaId: z.ZodNullable<z.ZodString>;
}, z.core.$strip>;
export declare const UpdateConfiguracionSchema: z.ZodObject<{
    tema: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    emailNotificaciones: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
    notificacionesPush: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
    privacidadPerfil: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    controlParental: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
    calidadVideo: z.ZodOptional<z.ZodDefault<z.ZodString>>;
    tamanoTexto: z.ZodOptional<z.ZodDefault<z.ZodString>>;
    idiomaId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, z.core.$strip>;
