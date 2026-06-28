import {
  OpenAPIRegistry,
  OpenApiGeneratorV3,
  extendZodWithOpenApi,
} from '@asteasolutions/zod-to-openapi';
import { OpenAPIObject } from 'openapi3-ts/oas30';
import { z } from 'zod';

extendZodWithOpenApi(z);

export const registry = new OpenAPIRegistry();

registry.registerComponent('securitySchemes', 'bearerAuth', {
  type: 'http',
  scheme: 'bearer',
  bearerFormat: 'JWT', // Even though it's opaque, 'bearer' is standard
});

export const getOpenApiDocumentation = (): OpenAPIObject => {
  const generator = new OpenApiGeneratorV3(registry.definitions);

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
