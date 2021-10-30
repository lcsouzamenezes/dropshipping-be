import { container } from 'tsyringe'
import { CreateNotificationService } from '@modules/notifications/services/CreateNotification/CreateNotificationService'

export interface BlingProductsImportationEndedData {
  account_id: string
  message: string
  type: 'success' | 'error'
}

class BlingProductsImportationEnded {
  async handle({
    account_id,
    message,
    type,
  }: BlingProductsImportationEndedData) {
    const createNotificationService = container.resolve(
      CreateNotificationService
    )
    await createNotificationService.execute({
      account_id,
      type,
      title: 'Importação finalizada',
      data: message,
    })
  }
}

export { BlingProductsImportationEnded }
