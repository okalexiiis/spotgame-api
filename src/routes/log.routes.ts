import { Router } from 'express';
import * as logController from '../controllers/log.controller';
import { validate } from '../middlewares/validate.middleware';
import { authenticate } from '../middlewares/auth.middleware';
import { PaginationQuerySchema } from '../lib/pagination';

const router: Router = Router();

router.get('/', authenticate, validate({ query: PaginationQuerySchema }), logController.listMine);

export default router;
