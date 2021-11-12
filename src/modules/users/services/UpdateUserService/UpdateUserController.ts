import { UserMapper } from '@modules/users/mappers/UserMapper'
import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { UpdateUserService } from './UpdateUserService'

interface UpdateUserRequestBody {
  name: string
  email: string
  active: boolean
  password?: string
}

class UpdateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { account_id } = request.user
    const { id } = request.params
    const { name, email, active, password } =
      request.body as UpdateUserRequestBody

    const updateUserService = container.resolve(UpdateUserService)

    const user = await updateUserService.execute({
      id,
      account_id,
      name,
      email,
      active,
      password,
    })

    return response.json(UserMapper.toDTO(user))
  }
}

export { UpdateUserController }
