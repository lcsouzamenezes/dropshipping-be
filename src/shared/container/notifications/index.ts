import { container } from 'tsyringe'

import { NotificationsRepository } from '@modules/notifications/infra/typeorm/repositories/NotificationsRepository'
import { INotificationsRepository } from '@modules/notifications/repositories/INotificationsRepository'

container.registerSingleton<INotificationsRepository>(
  'NotificationsRepository',
  NotificationsRepository
)
