import { ListNotificationsController } from '@modules/notifications/services/ListNotificationService/ListNotificationsController'
import { SetNotificationAsReadController } from '@modules/notifications/services/SetNotificationAsRead/SetNotificationAsReadController'
import { Router } from 'express'

import setNotificationAsReadValidations from '@modules/notifications/validations/setNotificationAsReadValidations'

const listNotificationController = new ListNotificationsController()
const setNotificationAsReadController = new SetNotificationAsReadController()

const notificationsRoutes = Router()

notificationsRoutes.get('/', listNotificationController.handle)
notificationsRoutes.post(
  '/',
  setNotificationAsReadValidations,
  setNotificationAsReadController.handle
)

export { notificationsRoutes }
