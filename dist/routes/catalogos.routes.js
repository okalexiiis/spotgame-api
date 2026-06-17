"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const prisma_1 = __importDefault(require("../lib/prisma"));
const catController = __importStar(require("../controllers/catalogos.controller"));
const validate_middleware_1 = require("../middlewares/validate.middleware");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const zod_1 = require("zod");
const rol_schema_1 = require("../schemas/rol.schema");
const idioma_schema_1 = require("../schemas/idioma.schema");
const plataforma_schema_1 = require("../schemas/plataforma.schema");
const genero_schema_1 = require("../schemas/genero.schema");
const categoriaTrailer_schema_1 = require("../schemas/categoriaTrailer.schema");
const router = (0, express_1.Router)();
const IdParam = zod_1.z.object({ id: zod_1.z.string().uuid() });
const configs = [
    { path: '/roles', model: prisma_1.default.rol, id: 'idRol', schemas: { create: rol_schema_1.CreateRolSchema, update: rol_schema_1.UpdateRolSchema } },
    { path: '/idiomas', model: prisma_1.default.idioma, id: 'idIdioma', schemas: { create: idioma_schema_1.CreateIdiomaSchema, update: idioma_schema_1.UpdateIdiomaSchema } },
    { path: '/plataformas', model: prisma_1.default.plataforma, id: 'idPlataforma', schemas: { create: plataforma_schema_1.CreatePlataformaSchema, update: plataforma_schema_1.UpdatePlataformaSchema } },
    { path: '/generos', model: prisma_1.default.genero, id: 'idGenero', schemas: { create: genero_schema_1.CreateGeneroSchema, update: genero_schema_1.UpdateGeneroSchema } },
    { path: '/categorias-trailer', model: prisma_1.default.categoriaTrailer, id: 'idCategoria', schemas: { create: categoriaTrailer_schema_1.CreateCategoriaTrailerSchema, update: categoriaTrailer_schema_1.UpdateCategoriaTrailerSchema } },
];
configs.forEach((c) => {
    router.get(c.path, catController.createList(c.model));
    router.get(`${c.path}/:id`, (0, validate_middleware_1.validate)({ params: IdParam }), catController.createGetById(c.model, c.id));
    router.post(c.path, auth_middleware_1.authenticate, (0, validate_middleware_1.validate)({ body: c.schemas.create }), catController.createCreate(c.model));
    router.put(`${c.path}/:id`, auth_middleware_1.authenticate, (0, validate_middleware_1.validate)({ params: IdParam, body: c.schemas.update }), catController.createUpdate(c.model, c.id));
    router.delete(`${c.path}/:id`, auth_middleware_1.authenticate, (0, validate_middleware_1.validate)({ params: IdParam }), catController.createRemove(c.model, c.id));
});
exports.default = router;
//# sourceMappingURL=catalogos.routes.js.map