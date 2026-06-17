import { z } from 'zod';
export declare const QrGenerateResponseSchema: z.ZodObject<{
    codigo: z.ZodString;
    expiraEn: z.ZodString;
}, z.core.$strip>;
export declare const QrApproveRequestSchema: z.ZodObject<{
    codigo: z.ZodString;
}, z.core.$strip>;
export declare const QrStatusResponseSchema: z.ZodObject<{
    estado: z.ZodEnum<{
        pendiente: "pendiente";
        aprobado: "aprobado";
        expirado: "expirado";
    }>;
    token: z.ZodNullable<z.ZodString>;
}, z.core.$strip>;
