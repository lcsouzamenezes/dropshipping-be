import { IUsersRepository } from '@modules/users/repositories/IUsersRepository'
import { AppError } from '@shared/errors/AppError'
import { Request, Response } from 'express'
import { container, inject, injectable } from 'tsyringe'
import { CreateSessionService } from './CreateSessionService'

interface IRequest {
  email: string
  password: string
}

class CreateSessionController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body as IRequest
    const createSessionService = container.resolve(CreateSessionService)

    const { token, refreshToken, user } = await createSessionService.execute({
      email,
      password,
    })

    return response.json({ user, token, refresh_token: refreshToken })
  }
}

export { CreateSessionController }
