import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ActivateUserService } from './ActivateUserService'

class ActivateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { user_id, token } = request.body

    const activateUserService = container.resolve(ActivateUserService)

    const user = await activateUserService.execute(token, user_id)

    return response.json(user)
  }
}

export { ActivateUserController }
