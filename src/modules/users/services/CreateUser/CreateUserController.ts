import { classToClass } from 'class-transformer'
import { NextFunction, Request, Response } from 'express'
import { container } from 'tsyringe'
import { CreateUserService } from './CreateUserService'

interface IRequest {
  name: string
  email: string
  password: string
  active?: boolean
}

class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const createUserService = container.resolve(CreateUserService)

    const { account_id } = request.user

    const { name, email, password, active = false } = request.body as IRequest

    const user = await createUserService.execute({
      name,
      email,
      password,
      account_id,
      active,
    })
    return response.json(classToClass(user))
  }
}

export { CreateUserController }
