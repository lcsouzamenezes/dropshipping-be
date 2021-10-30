import { ICreateNotificationDTO } from '@modules/notifications/dtos/ICreateNotificationDTO'
import { NotificationsRepository } from '@modules/notifications/repositories/in-memory/NotificationsRepository'
import { CreateNotificationService } from './CreateNotificationService'

let notificationsRepository: NotificationsRepository
let createNotificationService: CreateNotificationService

describe('CreateNotificationService', () => {
  beforeEach(() => {
    notificationsRepository = new NotificationsRepository()
    createNotificationService = new CreateNotificationService(
      notificationsRepository
    )
  })

  it('should be able to create a new notification', async () => {
    const data: ICreateNotificationDTO = {
      title: 'Test of notification',
      account_id: '33413243473215041288597018901146',
      data: 'New incoming notification!',
    }
    const notification = await createNotificationService.execute(data)

    expect(notification).toHaveProperty('id')
  })

  it('should be unread when created', async () => {
    const data: ICreateNotificationDTO = {
      title: 'Test of notification',
      account_id: '33413243473215041288597018901146',
      data: 'New incoming notification!',
    }
    const notification = await createNotificationService.execute(data)

    expect(notification.read_at).toBeUndefined()
  })
})
