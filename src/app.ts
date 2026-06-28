import express, { Express } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import './schemas';
import routes from './routes';
import { getOpenApiDocumentation } from './lib/openapi';
import { errorHandler } from './middlewares/error.middleware';
import { apiLimiter } from './middlewares/rateLimit';
import prisma from './lib/prisma';

const app: Express = express();

app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(getOpenApiDocumentation()));

// API Routes
app.use('/api/v1', apiLimiter, routes);

app.get('/health', async (req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  } catch {
    res.status(503).json({ status: 'error', message: 'Database unavailable' });
  }
});

// Global Error Handler
app.use(errorHandler);

export default app;
