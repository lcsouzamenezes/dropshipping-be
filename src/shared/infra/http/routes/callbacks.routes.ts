import Queue from '@shared/libs/Queue'
import { Router, Request, Response } from 'express'

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

export { callbacksRoutes }
