import { ICreateNotificationDTO } from '../dtos/ICreateNotificationDTO'
import { Notification } from '@modules/notifications/infra/typeorm/entities/Notification'

interface INotificationsRepository {
  create(data: ICreateNotificationDTO): Promise<Notification>
  getAll(account_id: string, user_id?: string): Promise<Notification[]>
}

export { INotificationsRepository }
