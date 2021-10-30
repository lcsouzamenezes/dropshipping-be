import { container } from 'tsyringe'
import { CreateNotificationService } from '@modules/notifications/services/CreateNotification/CreateNotificationService'

class BlingProductsImportationStart {
  async handle(account_id: string) {
    const createNotificationService = container.resolve(
      CreateNotificationService
    )
    await createNotificationService.execute({
      account_id,
      title: 'Importação em andamento',
      data: 'Você recebera uma notificação quando a importação for finalizada',
    })
  }
}

export { BlingProductsImportationStart }
