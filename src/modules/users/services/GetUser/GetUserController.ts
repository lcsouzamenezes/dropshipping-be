import { UserMapper } from '@modules/users/mappers/UserMapper'
import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { GetUserService } from './GetUserService'

class GetUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { account_id } = request.user
    const { id: user_id } = request.params

    const getUserService = container.resolve(GetUserService)

    const user = await getUserService.execute({
      user_id,
      account_id,
    })

    return response.json(UserMapper.toDTO(user))
  }
}

export { GetUserController }
