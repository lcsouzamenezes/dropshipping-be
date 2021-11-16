import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ListUsersService } from './ListUsersService'
import { UserMapper } from '../../mappers/UserMapper'

class ListUsersController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { account_id } = request.user

    const listUsersService = container.resolve(ListUsersService)
    const users = await listUsersService.execute(account_id)

    return response.json({ users: users.map((user) => UserMapper.toDTO(user)) })
  }
}

export { ListUsersController }
