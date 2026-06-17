import { Router } from 'express';
import * as trailerController from '../controllers/trailer.controller';
import { validate } from '../middlewares/validate.middleware';
import { CreateTrailerSchema, UpdateTrailerSchema } from '../schemas/trailer.schema';
import { LinkCategoriaSchema } from '../schemas/relations.schema';
import { authenticate } from '../middlewares/auth.middleware';
import { z } from 'zod';

const router: Router = Router();
const IdParamSchema = z.object({ id: z.string().uuid() });

router.get('/', trailerController.list);
router.get('/:id', validate({ params: IdParamSchema }), trailerController.getById);

router.post('/', authenticate, validate({ body: CreateTrailerSchema }), trailerController.create);
router.put('/:id', authenticate, validate({ params: IdParamSchema, body: UpdateTrailerSchema }), trailerController.update);
router.delete('/:id', authenticate, validate({ params: IdParamSchema }), trailerController.remove);

// Relations
router.post('/:id/categorias', authenticate, validate({ params: IdParamSchema, body: LinkCategoriaSchema }), trailerController.addCategoria);
router.delete('/:id/categorias', authenticate, validate({ params: IdParamSchema, body: LinkCategoriaSchema }), trailerController.removeCategoria);

export default router;
