import { ICreateNotificationDTO } from '@modules/notifications/dtos/ICreateNotificationDTO'
import { INotificationsRepository } from '@modules/notifications/repositories/INotificationsRepository'

import { Notification } from '@modules/notifications/infra/typeorm/entities/Notification'
import { inject, injectable } from 'tsyringe'
import { copyFileSync } from 'fs'

@injectable()
class CreateNotificationService {
  constructor(
    @inject('NotificationsRepository')
    private notificationsRepository: INotificationsRepository
  ) {}

  async execute(data: ICreateNotificationDTO): Promise<Notification> {
    const notification = await this.notificationsRepository.create(data)
    return notification
  }
}

export { CreateNotificationService }
