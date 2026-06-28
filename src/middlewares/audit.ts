import { Request, Response, NextFunction } from 'express';
import prisma from '../lib/prisma';

const METHOD_WHITELIST = new Set(['POST', 'PUT', 'PATCH', 'DELETE']);

// ponytail: derive entidad from path prefix via a mapping table.
// Mounted globally at the top of routes/index.ts; res.on('finish') fires
// after the handler + authenticate have populated req.user.
const entidadMap: Record<string, string> = {
  '/auth/register': 'usuario',
  '/auth/login': 'sesion',
  '/auth/logout': 'sesion',
  '/upload/presign': 'upload',
  '/juegos': 'juego',
  '/noticias': 'noticia',
  '/trailers': 'trailer',
  '/catalogs/roles': 'rol',
  '/catalogs/idiomas': 'idioma',
  '/catalogs/plataformas': 'plataforma',
  '/catalogs/generos': 'genero',
  '/catalogs/categorias-trailer': 'categoria_trailer',
  '/me/configuracion': 'configuracion_usuario',
  '/me/favoritos': 'favorito',
  '/me/descargas': 'descarga',
  '/me/reservas': 'reserva',
  '/me/notificaciones': 'notificacion',
  '/me/logs': 'log_actividad',
  '/proximos-lanzamientos': 'lanzamiento',
  '/usuarios': 'usuario_rol',
  '/qr-login/generate': 'qr_login',
  '/qr-login/approve': 'qr_login',
};

function deriveEntidad(path: string): string | null {
  const cleaned = path.replace(/\/api\/v1/, '');
  const parts = cleaned.split('/').filter(Boolean);

  // Sub-resource patterns (/:id/generos, /:id/plataformas, /:id/categorias, /:id/imagenes, /:id/roles, /:id/moderate)
  if (parts.length >= 3 && !['me', 'catalogs'].includes(parts[0])) {
    const base = parts[0].replace(/s$/, '');
    const sub = parts[2].replace(/s$/, '');
    if (sub === 'moderate') return base;
    return `${base}_${sub}`;
  }

  // /me/* sub-paths
  if (parts[0] === 'me' && parts.length >= 2) {
    return entidadMap[`/me/${parts[1]}`] ?? null;
  }

  // /catalogs/*
  if (parts[0] === 'catalogs' && parts.length >= 2) {
    const catPart = parts[1].replace('categorias-trailer', 'categoria_trailer');
    return entidadMap[`/catalogs/${catPart}`] ?? null;
  }

  // Default: first path segment
  return entidadMap[`/${parts[0]}`] ?? null;
}

export const audit = (req: Request, res: Response, next: NextFunction) => {
  const accion = req.method.toUpperCase();
  if (!METHOD_WHITELIST.has(accion)) return next();

  res.on('finish', () => {
    const entidad = deriveEntidad(req.path);
    if (!entidad) return;

    prisma.logActividad
      .create({
        data: {
          idUsuario: req.user?.idUsuario ?? null,
          accion,
          entidad,
          entidadId: (req.params as Record<string, string>).id ?? null,
          detalles: { path: req.path, statusCode: res.statusCode },
          ipAddress: req.ip,
        },
      })
      .catch((err) => console.error('audit write failed:', err.message));
  });

  next();
};
