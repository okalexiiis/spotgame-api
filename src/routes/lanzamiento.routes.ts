import { Router } from 'express';
import * as lanzamientoController from '../controllers/lanzamiento.controller';
import { validate } from '../middlewares/validate.middleware';
import { CreateLanzamientoSchema, UpdateLanzamientoSchema } from '../schemas/relations.schema';
import { authenticate } from '../middlewares/auth.middleware';
import { authorize } from '../middlewares/authorize';
import { z } from 'zod';
import { PaginationQuerySchema } from '../lib/pagination';

const router: Router = Router();
const IdParamSchema = z.object({ id: z.string().uuid() });

router.get('/', validate({ query: PaginationQuerySchema }), lanzamientoController.list);
router.get('/:id', validate({ params: IdParamSchema }), lanzamientoController.getById);

router.post('/', authenticate, authorize('Admin'), validate({ body: CreateLanzamientoSchema }), lanzamientoController.create);
router.put('/:id', authenticate, authorize('Admin'), validate({ params: IdParamSchema, body: UpdateLanzamientoSchema }), lanzamientoController.update);
router.delete('/:id', authenticate, authorize('Admin'), validate({ params: IdParamSchema }), lanzamientoController.remove);

export default router;
