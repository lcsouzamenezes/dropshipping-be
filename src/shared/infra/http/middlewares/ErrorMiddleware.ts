import { AppError } from '@shared/errors/AppError'
import { NextFunction, Request, Response, ErrorRequestHandler } from 'express'

const ErrorHandler: ErrorRequestHandler = (
  error: AppError,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  if (error.message && error.statusCode) {
    return response
      .status(error.statusCode)
      .json({ code: error.code, message: error.message, error: true })
  }
  return response.status(500).json({
    code: 'server.unexpected',
    message: `Internal Server Error - ${error.message}`,
    error: true,
  })
}

export { ErrorHandler }
