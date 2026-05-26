import { Request, Response, NextFunction } from 'express';
import logger from './logger';
import { errorResponse } from './response';

// Async wrapper to catch errors
export const asyncHandler = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

// Global error handler
export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  logger.error({
    message,
    statusCode,
    path: req.path,
    method: req.method,
    stack: err.stack,
  });

  res.status(statusCode).json(errorResponse(message, statusCode, err.message));
};

// Not found handler
export const notFoundHandler = (req: Request, res: Response) => {
  res.status(404).json(
    errorResponse(`Route ${req.originalUrl} not found`, 404),
  );
};
