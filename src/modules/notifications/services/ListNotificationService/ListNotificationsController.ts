import { NotificationMapper } from '@modules/mappers/NotificationMapper'
import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ListNotificationService } from './ListNotificationService'

class ListNotificationsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id, account_id } = request.user

    const listNotificationService = container.resolve(ListNotificationService)
    const notifications = await listNotificationService.execute(account_id, id)
    const notificationsDTO = notifications.map((notification) =>
      NotificationMapper.toDTO(notification)
    )
    return response.json(notificationsDTO)
  }
}

export { ListNotificationsController }
