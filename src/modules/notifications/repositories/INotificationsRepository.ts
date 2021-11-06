import { ICreateNotificationDTO } from '../dtos/ICreateNotificationDTO'
import { Notification } from '@modules/notifications/infra/typeorm/entities/Notification'

interface INotificationsRepository {
  create(data: ICreateNotificationDTO): Promise<Notification>
  getAll(account_id: string, user_id?: string): Promise<Notification[]>
  findById(id: string, account_id: string): Promise<Notification>
  update(notification: Notification): Promise<Notification>
}

export { INotificationsRepository }
