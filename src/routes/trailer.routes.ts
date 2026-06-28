import { Router } from 'express';
import * as trailerController from '../controllers/trailer.controller';
import { validate } from '../middlewares/validate.middleware';
import { CreateTrailerSchema, UpdateTrailerSchema, ModerateTrailerSchema } from '../schemas/trailer.schema';
import { LinkCategoriaSchema } from '../schemas/relations.schema';
import { authenticate } from '../middlewares/auth.middleware';
import { authorize, ADMIN_ROLES } from '../middlewares/authorize';
import { optionalAuth } from '../middlewares/optionalAuth';
import { z } from 'zod';
import { PaginationQuerySchema } from '../lib/pagination';

const router: Router = Router();
const IdParamSchema = z.object({ id: z.string().uuid() });

router.get('/', optionalAuth, validate({ query: PaginationQuerySchema }), trailerController.list);
router.get('/:id', validate({ params: IdParamSchema }), trailerController.getById);

router.post('/', authenticate, authorize(...ADMIN_ROLES), validate({ body: CreateTrailerSchema }), trailerController.create);
router.put('/:id', authenticate, authorize(...ADMIN_ROLES), validate({ params: IdParamSchema, body: UpdateTrailerSchema }), trailerController.update);
router.delete('/:id', authenticate, authorize(...ADMIN_ROLES), validate({ params: IdParamSchema }), trailerController.remove);

router.patch('/:id/moderate', authenticate, authorize(...ADMIN_ROLES), validate({ params: IdParamSchema, body: ModerateTrailerSchema }), trailerController.moderate);

// Relations
router.post('/:id/categorias', authenticate, authorize(...ADMIN_ROLES), validate({ params: IdParamSchema, body: LinkCategoriaSchema }), trailerController.addCategoria);
router.delete('/:id/categorias', authenticate, authorize(...ADMIN_ROLES), validate({ params: IdParamSchema, body: LinkCategoriaSchema }), trailerController.removeCategoria);

export default router;
