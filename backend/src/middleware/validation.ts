import { z } from 'zod';
import { Request, Response, NextFunction } from 'express';
import { errorResponse } from '../utils/response';

export const validateRequest =
  (schema: z.ZodSchema) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });

      req.body = data.body;
      req.query = data.query;
      req.params = data.params;

      next();
    } catch (error: any) {
      const errorMessages = error.errors
        .map((e: any) => `${e.path.join('.')}: ${e.message}`)
        .join(', ');

      res.status(400).json(
        errorResponse( 'Validation Error', 400, errorMessages),
      );
    }
  };
