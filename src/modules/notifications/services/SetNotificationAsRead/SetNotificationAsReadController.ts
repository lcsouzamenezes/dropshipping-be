import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { SetNotificationAsReadService } from './SetNotificationAsReadService'

class SetNotificationAsReadController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { account_id } = request.user
    const { id } = request.body
    const setNotificationAsReadService = container.resolve(
      SetNotificationAsReadService
    )

    const notification = await setNotificationAsReadService.execute(
      id,
      account_id
    )

    return response.json(notification)
  }
}

export { SetNotificationAsReadController }
