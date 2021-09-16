import { AppError } from '@shared/errors/AppError';
import { NextFunction, Request, Response, ErrorRequestHandler } from 'express';

const ErrorHandler: ErrorRequestHandler = (
  error: AppError,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  if (error.message && error.statusCode) {
    return response.status(error.statusCode).json({ message: error.message });
  }
  console.error(error);
  return response
    .status(500)
    .json({ message: `Internal Server Error - ${error.message}` });
};

export { ErrorHandler };
