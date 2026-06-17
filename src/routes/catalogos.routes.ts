import { Router } from 'express';
import prisma from '../lib/prisma';
import * as catController from '../controllers/catalogos.controller';
import { validate } from '../middlewares/validate.middleware';
import { authenticate } from '../middlewares/auth.middleware';
import { z } from 'zod';
import { RolSchema, CreateRolSchema, UpdateRolSchema } from '../schemas/rol.schema';
import { IdiomaSchema, CreateIdiomaSchema, UpdateIdiomaSchema } from '../schemas/idioma.schema';
import { PlataformaSchema, CreatePlataformaSchema, UpdatePlataformaSchema } from '../schemas/plataforma.schema';
import { GeneroSchema, CreateGeneroSchema, UpdateGeneroSchema } from '../schemas/genero.schema';
import { CategoriaTrailerSchema, CreateCategoriaTrailerSchema, UpdateCategoriaTrailerSchema } from '../schemas/categoriaTrailer.schema';

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
  router.post(c.path, authenticate, validate({ body: c.schemas.create }), catController.createCreate(c.model));
  router.put(`${c.path}/:id`, authenticate, validate({ params: IdParam, body: c.schemas.update }), catController.createUpdate(c.model, c.id));
  router.delete(`${c.path}/:id`, authenticate, validate({ params: IdParam }), catController.createRemove(c.model, c.id));
});

export default router;
