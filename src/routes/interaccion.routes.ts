import { Router } from 'express';
import * as interaccionController from '../controllers/interaccion.controller';
import { validate } from '../middlewares/validate.middleware';
import { AddFavoritoSchema, LogDescargaSchema, AddReservaSchema } from '../schemas/interaccion.schema';
import { authenticate } from '../middlewares/auth.middleware';
import { z } from 'zod';
import { PaginationQuerySchema } from '../lib/pagination';

const router: Router = Router();

router.use(authenticate);

// Favorites
router.get('/favoritos', validate({ query: PaginationQuerySchema }), interaccionController.listFavoritos);
router.post('/favoritos', validate({ body: AddFavoritoSchema }), interaccionController.addFavorito);
router.delete('/favoritos/:idJuego', validate({ params: z.object({ idJuego: z.string().uuid() }) }), interaccionController.removeFavorito);

// Downloads
router.get('/descargas', validate({ query: PaginationQuerySchema }), interaccionController.listDescargas);
router.post('/descargas', validate({ body: LogDescargaSchema }), interaccionController.logDescarga);

// Reservations
router.get('/reservas', validate({ query: PaginationQuerySchema }), interaccionController.listReservas);
router.post('/reservas', validate({ body: AddReservaSchema }), interaccionController.addReserva);
router.delete('/reservas/:idLanzamiento', validate({ params: z.object({ idLanzamiento: z.string().uuid() }) }), interaccionController.removeReserva);

export default router;
