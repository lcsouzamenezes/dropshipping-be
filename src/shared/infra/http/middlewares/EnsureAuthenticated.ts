import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'

import { UsersRepository } from '@modules/users/infra/repositories/UsersRepository'
import { AppError } from '@shared/errors/AppError'

import authConfig from '@config/auth'

async function EnsureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> {
  const authHeader = request.headers.authorization
  const usersRepository = new UsersRepository()

  if (!authHeader) {
    throw new AppError('Token is missing', 'token.missing', 401)
  }

  try {
    const [, token] = authHeader.split(' ')

    const { sub: user_id } = verify(token, authConfig.token_secret)

    const user = await usersRepository.findById(String(user_id))

    if (!user) {
      throw new AppError('User not found', 'auth.user.not_found', 401)
    }

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
