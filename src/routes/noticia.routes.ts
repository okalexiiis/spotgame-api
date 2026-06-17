import { Router } from 'express';
import * as noticiaController from '../controllers/noticia.controller';
import { validate } from '../middlewares/validate.middleware';
import { CreateNoticiaSchema, UpdateNoticiaSchema, NoticiaQuerySchema } from '../schemas/noticia.schema';
import { AddImagenNoticiaSchema } from '../schemas/relations.schema';
import { authenticate } from '../middlewares/auth.middleware';
import { z } from 'zod';

const router: Router = Router();
const IdParamSchema = z.object({ id: z.string().uuid() });

router.get('/', validate({ query: NoticiaQuerySchema }), noticiaController.list);
router.get('/:id', validate({ params: IdParamSchema }), noticiaController.getById);

router.post('/', authenticate, validate({ body: CreateNoticiaSchema }), noticiaController.create);
router.put('/:id', authenticate, validate({ params: IdParamSchema, body: UpdateNoticiaSchema }), noticiaController.update);
router.delete('/:id', authenticate, validate({ params: IdParamSchema }), noticiaController.remove);

// Relations
router.post('/:id/imagenes', authenticate, validate({ params: IdParamSchema, body: AddImagenNoticiaSchema }), noticiaController.addImagen);
router.delete('/:id/imagenes/:idImagen', authenticate, validate({ params: IdParamSchema.extend({ idImagen: z.string().uuid() }) }), noticiaController.removeImagen);

export default router;
