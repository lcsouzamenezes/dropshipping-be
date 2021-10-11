import { AppError } from '@shared/errors/AppError'
import { classToClass } from 'class-transformer'
import { create } from 'domain'
import { NextFunction, Request, Response } from 'express'
import { container } from 'tsyringe'
import { CreateUserService } from './CreateUserService'

interface IRequest {
  name: string
  email: string
  password: string
  account_id: string
}

class CreateUserController {
  async handle(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response> {
    const createUserService = container.resolve(CreateUserService)
    const { name, email, password, account_id } = request.body as IRequest

    const user = await createUserService.execute({
      name,
      email,
      password,
      account_id,
    })
    return response.json(classToClass(user))
  }
}

export { CreateUserController }
