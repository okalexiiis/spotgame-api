import { Router } from 'express';
import prisma from '../lib/prisma';
import * as catController from '../controllers/catalogos.controller';
import { validate } from '../middlewares/validate.middleware';
import { authenticate } from '../middlewares/auth.middleware';
import { authorize } from '../middlewares/authorize';
import { z } from 'zod';
import { CreateRolSchema, UpdateRolSchema } from '../schemas/rol.schema';
import { CreateIdiomaSchema, UpdateIdiomaSchema } from '../schemas/idioma.schema';
import { CreatePlataformaSchema, UpdatePlataformaSchema } from '../schemas/plataforma.schema';
import { CreateGeneroSchema, UpdateGeneroSchema } from '../schemas/genero.schema';
import { CreateCategoriaTrailerSchema, UpdateCategoriaTrailerSchema } from '../schemas/categoriaTrailer.schema';

const router: Router = Router();
const IdParam = z.object({ id: z.string().uuid() });

const configs = [
  { path: '/roles', model: prisma.rol, id: 'idRol', schemas: { create: CreateRolSchema, update: UpdateRolSchema } },
  { path: '/idiomas', model: prisma.idioma, id: 'idIdioma', schemas: { create: CreateIdiomaSchema, update: UpdateIdiomaSchema } },
  { path: '/plataformas', model: prisma.plataforma, id: 'idPlataforma', schemas: { create: CreatePlataformaSchema, update: UpdatePlataformaSchema } },
  { path: '/generos', model: prisma.genero, id: 'idGenero', schemas: { create: CreateGeneroSchema, update: UpdateGeneroSchema } },
  { path: '/categorias-trailer', model: prisma.categoriaTrailer, id: 'idCategoria', schemas: { create: CreateCategoriaTrailerSchema, update: UpdateCategoriaTrailerSchema } },
];

configs.forEach((c) => {
  router.get(c.path, catController.createList(c.model));
  router.get(`${c.path}/:id`, validate({ params: IdParam }), catController.createGetById(c.model, c.id));
  router.post(c.path, authenticate, authorize('Admin'), validate({ body: c.schemas.create }), catController.createCreate(c.model));
  router.put(`${c.path}/:id`, authenticate, authorize('Admin'), validate({ params: IdParam, body: c.schemas.update }), catController.createUpdate(c.model, c.id));
  router.delete(`${c.path}/:id`, authenticate, authorize('Admin'), validate({ params: IdParam }), catController.createRemove(c.model, c.id));
});

export default router;
