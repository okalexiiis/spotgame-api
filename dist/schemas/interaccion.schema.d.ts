import { z } from 'zod';
export declare const FavoritoSchema: z.ZodObject<{
    idFavorito: z.ZodString;
    idJuego: z.ZodString;
    fechaAgregado: z.ZodString;
}, z.core.$strip>;
export declare const AddFavoritoSchema: z.ZodObject<{
    idJuego: z.ZodString;
}, z.core.$strip>;
export declare const DescargaSchema: z.ZodObject<{
    idDescarga: z.ZodString;
    idJuego: z.ZodString;
    fechaDescarga: z.ZodString;
    plataforma: z.ZodNullable<z.ZodString>;
}, z.core.$strip>;
export declare const LogDescargaSchema: z.ZodObject<{
    idJuego: z.ZodString;
    plataforma: z.ZodString;
}, z.core.$strip>;
export declare const ReservaSchema: z.ZodObject<{
    idReserva: z.ZodString;
    idLanzamiento: z.ZodString;
    fechaReserva: z.ZodString;
}, z.core.$strip>;
export declare const AddReservaSchema: z.ZodObject<{
    idLanzamiento: z.ZodString;
}, z.core.$strip>;
