import { Request, Response, NextFunction } from 'express';
import logger from '../utils/logger';
import { errorResponse } from '../utils/response';

// Request logging middleware
export const requestLogger = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const start = Date.now();

  res.on('finish', () => {
    const duration = Date.now() - start;
    logger.info({
      method: req.method,
      path: req.path,
      statusCode: res.statusCode,
      duration: `${duration}ms`,
      ip: req.ip,
    });
  });

  next();
};

// Authentication middleware
export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res
      .status(401)
      .json(errorResponse('Unauthorized - No token provided', 401));
  }

  // Token verification logic would go here
  // For now, we'll just pass it along
  (req as any).user = { token };
  next();
};

// Rate limiting middleware (basic implementation)
export const rateLimitMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // Implement rate limiting logic here
  // Can use express-rate-limit package for production
  next();
};

// CORS helper
export const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
  optionsSuccessStatus: 200,
};
