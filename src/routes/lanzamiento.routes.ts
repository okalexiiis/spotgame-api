import { Router } from 'express';
import * as lanzamientoController from '../controllers/lanzamiento.controller';
import { validate } from '../middlewares/validate.middleware';
import { CreateLanzamientoSchema, UpdateLanzamientoSchema } from '../schemas/relations.schema';
import { authenticate } from '../middlewares/auth.middleware';
import { z } from 'zod';

const router: Router = Router();
const IdParamSchema = z.object({ id: z.string().uuid() });

router.get('/', lanzamientoController.list);
router.get('/:id', validate({ params: IdParamSchema }), lanzamientoController.getById);

router.post('/', authenticate, validate({ body: CreateLanzamientoSchema }), lanzamientoController.create);
router.put('/:id', authenticate, validate({ params: IdParamSchema, body: UpdateLanzamientoSchema }), lanzamientoController.update);
router.delete('/:id', authenticate, validate({ params: IdParamSchema }), lanzamientoController.remove);

export default router;
