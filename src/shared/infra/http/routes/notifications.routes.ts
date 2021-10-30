import { ListNotificationsController } from '@modules/notifications/services/ListNotificationService/ListNotificationsController'
import { Router } from 'express'

const listNotificationController = new ListNotificationsController()

const notificationsRoutes = Router()

notificationsRoutes.get('/', listNotificationController.handle)

export { notificationsRoutes }
