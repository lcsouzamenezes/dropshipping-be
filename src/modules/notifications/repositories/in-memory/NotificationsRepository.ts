import { ICreateNotificationDTO } from '@modules/notifications/dtos/ICreateNotificationDTO'
import { INotificationsRepository } from '../INotificationsRepository'
import { Notification } from '@modules/notifications/infra/typeorm/entities/Notification'

class NotificationsRepository implements INotificationsRepository {
  private notifications: Notification[] = []

  async create(data: ICreateNotificationDTO): Promise<Notification> {
    const notification = new Notification()

    Object.assign(notification, {
      ...data,
    })

    this.notifications.push(notification)

    return notification
  }

  async getAll(account_id: string, user_id: string): Promise<Notification[]> {
    const notifications = this.notifications.filter(
      (notification) =>
        (notification.account_id == account_id && !notification.user_id) ||
        notification.user_id == user_id
    )
    return notifications
  }
}

export { NotificationsRepository }
