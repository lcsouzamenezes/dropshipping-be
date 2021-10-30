import { NotificationsRepository } from '@modules/notifications/repositories/in-memory/NotificationsRepository'
import { ListNotificationService } from './ListNotificationService'

let notificationsRepository: NotificationsRepository
let listNotificationService: ListNotificationService

describe('ListNotificationService', () => {
  beforeEach(() => {
    notificationsRepository = new NotificationsRepository()
    listNotificationService = new ListNotificationService(
      notificationsRepository
    )
  })

  it('should be able to list notifications by account', async () => {
    const account_id = '75725141935880173299131152884043'

    for (let i = 1; i < 4; i++) {
      await notificationsRepository.create({
        account_id,
        data: 'Test notification data ' + i,
        title: 'Test Notification ' + i,
      })
    }

    const notifications = await listNotificationService.execute(account_id)

    expect(notifications).toHaveLength(3)
  })

  it('should be able to list notifications by user', async () => {
    const account_id = '09527151839828713516506019519989'

    for (let i = 1; i < 4; i++) {
      await notificationsRepository.create({
        account_id: '09527151839828713516506019519989',
        data: 'Test notification data ' + i,
        title: 'Test Notification ' + i,
      })
    }

    for (let i = 1; i < 4; i++) {
      await notificationsRepository.create({
        account_id,
        user_id: '10255129790922590387798809346615',
        data: 'Test notification data ' + i,
        title: 'Test Notification ' + i,
      })
    }
    const user_id = '75725141935880173299131152884043'

    for (let i = 1; i < 4; i++) {
      await notificationsRepository.create({
        account_id,
        user_id,
        data: 'Test notification data ' + i,
        title: 'Test Notification ' + i,
      })
    }

    const notifications = await listNotificationService.execute(
      account_id,
      user_id
    )

    expect(notifications).toHaveLength(6)
  })
})
