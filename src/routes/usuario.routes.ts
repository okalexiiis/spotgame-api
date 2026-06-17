import { Router } from 'express';
import * as usuarioController from '../controllers/usuario.controller';
import { validate } from '../middlewares/validate.middleware';
import { LinkRolSchema } from '../schemas/relations.schema';
import { authenticate } from '../middlewares/auth.middleware';
import { z } from 'zod';

const router: Router = Router();
const IdParamSchema = z.object({ id: z.string().uuid() });

router.get('/', authenticate, usuarioController.list);
router.get('/:id', authenticate, validate({ params: IdParamSchema }), usuarioController.getById);

router.post('/:id/roles', authenticate, validate({ params: IdParamSchema, body: LinkRolSchema }), usuarioController.addRol);
router.delete('/:id/roles', authenticate, validate({ params: IdParamSchema, body: LinkRolSchema }), usuarioController.removeRol);

export default router;
