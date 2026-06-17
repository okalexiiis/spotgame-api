import { z } from 'zod';
export declare const LogActividadSchema: z.ZodObject<{
    idLog: z.ZodString;
    accion: z.ZodString;
    entidad: z.ZodString;
    entidadId: z.ZodNullable<z.ZodString>;
    detalles: z.ZodNullable<z.ZodAny>;
    ipAddress: z.ZodNullable<z.ZodString>;
    fecha: z.ZodString;
}, z.core.$strip>;
