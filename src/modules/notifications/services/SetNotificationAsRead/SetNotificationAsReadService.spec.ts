import { NotificationsRepository } from '@modules/notifications/repositories/in-memory/NotificationsRepository'
import { SetNotificationAsReadService } from './SetNotificationAsReadService'

let notificationRepository: NotificationsRepository
let setNotificationAsReadService: SetNotificationAsReadService

describe('SetNotificationAsReadService', () => {
  beforeEach(() => {
    notificationRepository = new NotificationsRepository()
    setNotificationAsReadService = new SetNotificationAsReadService(
      notificationRepository
    )
  })

  it('should set a notification as read', async () => {
    const account_id = '47228686944541621801136513333630'

    const notification = await notificationRepository.create({
      data: 'New Zealand',
      account_id,
    })

    await setNotificationAsReadService.execute(notification.id, account_id)

    expect(notification.read_at).toBeTruthy()
  })
})
