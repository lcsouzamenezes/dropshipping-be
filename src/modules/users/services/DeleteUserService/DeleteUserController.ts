import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { DeleteUserService } from './DeleteUserService'

class DeleteUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { account_id } = request.user
    const { id } = request.params

    const deleteUserService = container.resolve(DeleteUserService)

    await deleteUserService.execute(id, account_id)

    return response.json({
      status: true,
      message: 'User deleted successfully',
    })
  }
}

export { DeleteUserController }
