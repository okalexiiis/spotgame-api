import { Router } from 'express';
import { audit } from '../middlewares/audit';
import authRoutes from './auth.routes';
import uploadRoutes from './upload.routes';
import juegoRoutes from './juego.routes';
import noticiaRoutes from './noticia.routes';
import trailerRoutes from './trailer.routes';
import catalogosRoutes from './catalogos.routes';
import configuracionRoutes from './configuracion.routes';
import interaccionRoutes from './interaccion.routes';
import notificacionRoutes from './notificacion.routes';
import logRoutes from './log.routes';
import qrRoutes from './qr.routes';
import lanzamientoRoutes from './lanzamiento.routes';
import usuarioRoutes from './usuario.routes';

const router: Router = Router();

router.use(audit);

router.use('/auth', authRoutes);
router.use('/upload', uploadRoutes);
router.use('/juegos', juegoRoutes);
router.use('/noticias', noticiaRoutes);
router.use('/trailers', trailerRoutes);

// Catalogs
router.use('/catalogs', catalogosRoutes);

// User Features (Scoped to /me)
router.use('/me/configuracion', configuracionRoutes);
router.use('/me', interaccionRoutes);
router.use('/me/notificaciones', notificacionRoutes);
router.use('/me/logs', logRoutes);

// Entities & Relations
router.use('/proximos-lanzamientos', lanzamientoRoutes);
router.use('/usuarios', usuarioRoutes);

// QR Login
router.use('/qr-login', qrRoutes);

export default router;
