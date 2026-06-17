import { z } from 'zod';
export declare const ProximoLanzamientoSchema: z.ZodObject<{
    idLanzamiento: z.ZodString;
    idJuego: z.ZodString;
    fechaLanzamiento: z.ZodNullable<z.ZodString>;
    ventanaLanzamiento: z.ZodNullable<z.ZodString>;
    descripcion: z.ZodNullable<z.ZodString>;
    bannerUrl: z.ZodNullable<z.ZodString>;
    destacado: z.ZodBoolean;
}, z.core.$strip>;
export declare const CreateLanzamientoSchema: z.ZodObject<{
    descripcion: z.ZodNullable<z.ZodString>;
    idJuego: z.ZodString;
    fechaLanzamiento: z.ZodNullable<z.ZodString>;
    bannerUrl: z.ZodNullable<z.ZodString>;
    destacado: z.ZodBoolean;
    ventanaLanzamiento: z.ZodNullable<z.ZodString>;
}, z.core.$strip>;
export declare const UpdateLanzamientoSchema: z.ZodObject<{
    descripcion: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    idJuego: z.ZodOptional<z.ZodString>;
    fechaLanzamiento: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    bannerUrl: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    destacado: z.ZodOptional<z.ZodBoolean>;
    ventanaLanzamiento: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, z.core.$strip>;
export declare const LinkGeneroSchema: z.ZodObject<{
    idGenero: z.ZodString;
}, z.core.$strip>;
export declare const LinkPlataformaSchema: z.ZodObject<{
    idPlataforma: z.ZodString;
}, z.core.$strip>;
export declare const LinkCategoriaSchema: z.ZodObject<{
    idCategoria: z.ZodString;
}, z.core.$strip>;
export declare const LinkRolSchema: z.ZodObject<{
    idRol: z.ZodString;
}, z.core.$strip>;
export declare const AddImagenNoticiaSchema: z.ZodObject<{
    urlImagen: z.ZodString;
    orden: z.ZodDefault<z.ZodNumber>;
    leyenda: z.ZodNullable<z.ZodString>;
}, z.core.$strip>;
