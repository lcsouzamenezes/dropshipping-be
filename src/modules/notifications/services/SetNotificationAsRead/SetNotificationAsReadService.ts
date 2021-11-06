import { Notification } from '@modules/notifications/infra/typeorm/entities/Notification'
import { INotificationsRepository } from '@modules/notifications/repositories/INotificationsRepository'
import { AppError } from '@shared/errors/AppError'
import { inject, injectable } from 'tsyringe'

@injectable()
class SetNotificationAsReadService {
  constructor(
    @inject('NotificationsRepository')
    private notificationsRepository: INotificationsRepository
  ) {}

  async execute(id: string, account_id: string): Promise<Notification> {
    const notification = await this.notificationsRepository.findById(
      id,
      account_id
    )

    if (!notification) {
      throw new AppError(
        'Notification not found',
        'read_notification:not_found',
        400
      )
    }

    notification.read_at = new Date()

    await this.notificationsRepository.update(notification)

    return notification
  }
}

export { SetNotificationAsReadService }
