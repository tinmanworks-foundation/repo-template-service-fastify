import Fastify from 'fastify';
import swagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';

import { loadConfig } from './config/env.js';
import { createLogger } from './logging/logger.js';
import type { HealthStatus } from './config/types.js';

export function buildApp() {
  const config = loadConfig();
  const app = Fastify({ logger: createLogger(config.logLevel) });

  app.register(swagger, {
    openapi: {
      info: { title: 'Service Template API', version: '0.1.0' },
    },
  });
  app.register(swaggerUi, { routePrefix: '/docs' });

  app.get<{ Reply: HealthStatus }>('/health', {
    schema: {
      response: {
        200: {
          type: 'object',
          properties: {
            status: { type: 'string' },
            service: { type: 'string' },
            timestamp: { type: 'string' },
          },
        },
      },
    },
  }, async () => ({
    status: 'ok',
    service: 'repo-template-service-fastify',
    timestamp: new Date().toISOString(),
  }));

  app.get('/openapi.json', async () => app.swagger());

  return { app, config };
}
