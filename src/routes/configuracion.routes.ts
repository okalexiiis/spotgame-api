import { Router } from 'express';
import * as configuracionController from '../controllers/configuracion.controller';
import { validate } from '../middlewares/validate.middleware';
import { UpdateConfiguracionSchema } from '../schemas/configuracion.schema';
import { authenticate } from '../middlewares/auth.middleware';

const router: Router = Router();

router.use(authenticate);

router.get('/', configuracionController.getMine);
router.put('/', validate({ body: UpdateConfiguracionSchema }), configuracionController.updateMine);

export default router;
