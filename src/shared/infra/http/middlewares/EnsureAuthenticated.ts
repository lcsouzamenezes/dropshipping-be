import { NextFunction, Request, Response } from 'express'

import { AppError } from '@shared/errors/AppError'
import { verifyToken } from '@utils/verifyToken'

async function EnsureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> {
  const authHeader = request.headers.authorization

  if (!authHeader) {
    throw new AppError('Token is missing', 'token.missing', 401)
  }

  try {
    const [, token] = authHeader.split(' ')

    const user = await verifyToken(token)

    request.user = {
      id: user.id,
      account_id: user.account_id,
    }

    return next()
  } catch (error) {
    throw new AppError('Invalid token', 'token.expired', 401)
  }
}

export { EnsureAuthenticated }
