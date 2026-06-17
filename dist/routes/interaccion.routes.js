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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const interaccionController = __importStar(require("../controllers/interaccion.controller"));
const validate_middleware_1 = require("../middlewares/validate.middleware");
const interaccion_schema_1 = require("../schemas/interaccion.schema");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const zod_1 = require("zod");
const router = (0, express_1.Router)();
router.use(auth_middleware_1.authenticate);
router.get('/favoritos', interaccionController.listFavoritos);
router.post('/favoritos', (0, validate_middleware_1.validate)({ body: interaccion_schema_1.AddFavoritoSchema }), interaccionController.addFavorito);
router.delete('/favoritos/:idJuego', (0, validate_middleware_1.validate)({ params: zod_1.z.object({ idJuego: zod_1.z.string().uuid() }) }), interaccionController.removeFavorito);
router.get('/descargas', interaccionController.listDescargas);
router.post('/descargas', (0, validate_middleware_1.validate)({ body: interaccion_schema_1.LogDescargaSchema }), interaccionController.logDescarga);
router.get('/reservas', interaccionController.listReservas);
router.post('/reservas', (0, validate_middleware_1.validate)({ body: interaccion_schema_1.AddReservaSchema }), interaccionController.addReserva);
router.delete('/reservas/:idLanzamiento', (0, validate_middleware_1.validate)({ params: zod_1.z.object({ idLanzamiento: zod_1.z.string().uuid() }) }), interaccionController.removeReserva);
exports.default = router;
//# sourceMappingURL=interaccion.routes.js.map