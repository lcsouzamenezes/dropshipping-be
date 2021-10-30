import { INotificationsRepository } from '@modules/notifications/repositories/INotificationsRepository'
import { inject, injectable } from 'tsyringe'

@injectable()
class ListNotificationService {
  constructor(
    @inject('NotificationsRepository')
    private notificationsRepository: INotificationsRepository
  ) {}

  async execute(account_id: string, user_id?: string) {
    const notifications = await this.notificationsRepository.getAll(
      account_id,
      user_id
    )
    return notifications
  }
}

export { ListNotificationService }
