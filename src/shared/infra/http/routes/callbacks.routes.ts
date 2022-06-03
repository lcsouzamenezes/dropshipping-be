import { UpdateStockController } from '@modules/products/services/UpdateStockService/UpdateStockController'
import Queue from '@shared/libs/Queue'
import { Request, Response, Router } from 'express'

const updateStockController = new UpdateStockController()

const callbacksRoutes = Router()

type Topic =
  | 'orders_v2'
  | 'items'
  | 'questions'
  | 'payments'
  | 'messages'
  | 'invoices'
  | 'claims'

export interface MercadolivreNotification {
  topic: Topic
  resource: string
  user_id: number
  application_id: number
  attempts: number
  recieved: Date
  sent: Date
}

callbacksRoutes.post(
  '/mercadolivre',
  (request: Request, response: Response): Response => {
    const notification = request.body as MercadolivreNotification

    switch (notification.topic) {
      case 'orders_v2':
        Queue.add('ProcessMercadolivreNotification', {
          notification,
        })
        break
      default:
        break
    }

    return response.send()
  }
)

callbacksRoutes.patch(
  '/bling/stock/:integration_id',
  updateStockController.handle
)

export { callbacksRoutes }
