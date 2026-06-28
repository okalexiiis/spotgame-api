import { Router } from 'express';
import * as juegoController from '../controllers/juego.controller';
import { validate } from '../middlewares/validate.middleware';
import { CreateJuegoSchema, UpdateJuegoSchema, JuegoQuerySchema } from '../schemas/juego.schema';
import { LinkGeneroSchema, LinkPlataformaSchema } from '../schemas/relations.schema';
import { authenticate } from '../middlewares/auth.middleware';
import { authorize } from '../middlewares/authorize';
import { z } from 'zod';

const router: Router = Router();
const IdParamSchema = z.object({ id: z.string().uuid() });

router.get('/', validate({ query: JuegoQuerySchema }), juegoController.list);
router.get('/:id', validate({ params: IdParamSchema }), juegoController.getById);

router.post('/', authenticate, authorize('Admin'), validate({ body: CreateJuegoSchema }), juegoController.create);
router.put('/:id', authenticate, authorize('Admin'), validate({ params: IdParamSchema, body: UpdateJuegoSchema }), juegoController.update);
router.delete('/:id', authenticate, authorize('Admin'), validate({ params: IdParamSchema }), juegoController.remove);

// Relations
router.post('/:id/generos', authenticate, authorize('Admin'), validate({ params: IdParamSchema, body: LinkGeneroSchema }), juegoController.addGenero);
router.delete('/:id/generos', authenticate, authorize('Admin'), validate({ params: IdParamSchema, body: LinkGeneroSchema }), juegoController.removeGenero);

router.post('/:id/plataformas', authenticate, authorize('Admin'), validate({ params: IdParamSchema, body: LinkPlataformaSchema }), juegoController.addPlataforma);
router.delete('/:id/plataformas', authenticate, authorize('Admin'), validate({ params: IdParamSchema, body: LinkPlataformaSchema }), juegoController.removePlataforma);

export default router;
