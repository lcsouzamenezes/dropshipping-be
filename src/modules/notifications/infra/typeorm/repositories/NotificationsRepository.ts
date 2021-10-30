import { Brackets, getRepository, Repository } from 'typeorm'
import { ICreateNotificationDTO } from '@modules/notifications/dtos/ICreateNotificationDTO'
import { INotificationsRepository } from '@modules/notifications/repositories/INotificationsRepository'
import { Notification } from '../entities/Notification'

class NotificationsRepository implements INotificationsRepository {
  private repository: Repository<Notification>

  constructor() {
    this.repository = getRepository(Notification)
  }

  async create(data: ICreateNotificationDTO): Promise<Notification> {
    const notification = this.repository.create(data)
    await this.repository.save(notification)
    return notification
  }

  async getAll(account_id: string, user_id?: string): Promise<Notification[]> {
    const query = this.repository.createQueryBuilder()

    query.where('account_id = :account_id', { account_id })

    if (user_id) {
      query.andWhere(
        new Brackets((qb) => {
          qb.where('user_id = :user_id', { user_id })
          qb.orWhere('user_id IS NULL')
        })
      )
    }

    const notifications = await query.getMany()
    return notifications
  }
}

export { NotificationsRepository }
