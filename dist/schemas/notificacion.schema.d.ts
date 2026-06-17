import { z } from 'zod';
export declare const NotificacionSchema: z.ZodObject<{
    idNotificacion: z.ZodString;
    titulo: z.ZodString;
    mensaje: z.ZodString;
    tipo: z.ZodNullable<z.ZodString>;
    leida: z.ZodBoolean;
    fechaCreacion: z.ZodString;
    entidad: z.ZodNullable<z.ZodString>;
    entidadId: z.ZodNullable<z.ZodString>;
}, z.core.$strip>;
