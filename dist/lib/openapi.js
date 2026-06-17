"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOpenApiDocumentation = exports.registry = void 0;
const zod_to_openapi_1 = require("@asteasolutions/zod-to-openapi");
exports.registry = new zod_to_openapi_1.OpenAPIRegistry();
exports.registry.registerComponent('securitySchemes', 'bearerAuth', {
    type: 'http',
    scheme: 'bearer',
    bearerFormat: 'JWT',
});
const getOpenApiDocumentation = () => {
    const generator = new zod_to_openapi_1.OpenApiGeneratorV3(exports.registry.definitions);
    return generator.generateDocument({
        openapi: '3.0.0',
        info: {
            version: '1.0.0',
            title: 'GameSpot API',
            description: 'API for Game Spotlight platform',
        },
        servers: [{ url: '/api/v1' }],
    });
};
exports.getOpenApiDocumentation = getOpenApiDocumentation;
//# sourceMappingURL=openapi.js.map