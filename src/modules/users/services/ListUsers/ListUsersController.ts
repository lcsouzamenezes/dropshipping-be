import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ListUsersService } from './ListUsersService'

class ListUsersController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listUsersService = container.resolve(ListUsersService)
    const users = await listUsersService.execute()

    return response.json({ users })
  }
}

export { ListUsersController }
