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
const lanzamientoController = __importStar(require("../controllers/lanzamiento.controller"));
const validate_middleware_1 = require("../middlewares/validate.middleware");
const relations_schema_1 = require("../schemas/relations.schema");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const zod_1 = require("zod");
const router = (0, express_1.Router)();
const IdParamSchema = zod_1.z.object({ id: zod_1.z.string().uuid() });
router.get('/', lanzamientoController.list);
router.get('/:id', (0, validate_middleware_1.validate)({ params: IdParamSchema }), lanzamientoController.getById);
router.post('/', auth_middleware_1.authenticate, (0, validate_middleware_1.validate)({ body: relations_schema_1.CreateLanzamientoSchema }), lanzamientoController.create);
router.put('/:id', auth_middleware_1.authenticate, (0, validate_middleware_1.validate)({ params: IdParamSchema, body: relations_schema_1.UpdateLanzamientoSchema }), lanzamientoController.update);
router.delete('/:id', auth_middleware_1.authenticate, (0, validate_middleware_1.validate)({ params: IdParamSchema }), lanzamientoController.remove);
exports.default = router;
//# sourceMappingURL=lanzamiento.routes.js.map