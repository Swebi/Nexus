import type { NextFunction, Request, Response } from 'express';
import LoggerInstance from '../loaders/logger';
import { ERRORS } from '../shared/errors';

export interface ApiError extends Error {
  message: string;
  statusCode?: number;
}

export const errorHandler = (
  error: ApiError,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  LoggerInstance.error(error);
  res.status(error.statusCode ?? ERRORS.INTERNAL_SERVER_ERROR.statusCode).json({
    success: false,
    message: error.message ?? ERRORS.INTERNAL_SERVER_ERROR.message.error,
  });
};
