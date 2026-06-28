import { Router } from 'express';
import * as notificacionController from '../controllers/notificacion.controller';
import { validate } from '../middlewares/validate.middleware';
import { authenticate } from '../middlewares/auth.middleware';
import { z } from 'zod';
import { PaginationQuerySchema } from '../lib/pagination';

const router: Router = Router();

router.use(authenticate);

router.get('/', validate({ query: PaginationQuerySchema }), notificacionController.listMine);
router.patch('/:id/read', validate({ params: z.object({ id: z.string().uuid() }) }), notificacionController.markAsRead);
router.patch('/read-all', notificacionController.markAllAsRead);

export default router;
