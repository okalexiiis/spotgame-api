import { Router } from 'express';
import * as logController from '../controllers/log.controller';
import { authenticate } from '../middlewares/auth.middleware';

const router: Router = Router();

router.get('/', authenticate, logController.listMine);

export default router;
