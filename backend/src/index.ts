import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import logger from './utils/logger';
import { errorHandler, notFoundHandler, requestLogger } from './utils/errorHandler';
import { corsOptions } from './middleware';
import config from './config';

// Routes
import healthRoutes from './routes/healthRoutes';
import userRoutes from './routes/userRoutes';
import contestRoutes from './routes/contestRoutes';
import problemRoutes from './routes/problemRoutes';

const app = express();
const PORT = config.server.port;

// Security middleware
app.use(helmet());
app.use(cors(corsOptions));

// Compression
app.use(compression());

// Request parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Logging
app.use(morgan('combined', { stream: { write: (message) => logger.info(message) } }));
app.use(requestLogger);

// API Routes
app.use('/api/health', healthRoutes);
app.use('/api/users', userRoutes);
app.use('/api/contests', contestRoutes);
app.use('/api/problems', problemRoutes);

// Not found handler
app.use(notFoundHandler);

// Global error handler
app.use(errorHandler);

// Start server
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    logger.info(`🚀 Server is running on http://localhost:${PORT}`);
    logger.info(`📝 Environment: ${config.server.nodeEnv}`);
  });
}

export default app;
