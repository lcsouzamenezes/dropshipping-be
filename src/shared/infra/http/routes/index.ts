import { Router } from 'express'
import { usersRoutes } from './users.routes'
import { accountsRoutes } from './accounts.routes'
import { sessionsRoutes } from './sessions.routes'
import { integrationsRoutes } from './integrations.routes'
import { EnsureAuthenticated } from '../middlewares/EnsureAuthenticated'
import { productsRoutes } from './products.routes'
import { notificationsRoutes } from './notifications.routes'
import { bullDashboardRoutes } from './bulldashboard.routes'

const routes = Router()

routes.use('/sessions', sessionsRoutes)
routes.use('/accounts', accountsRoutes)
routes.use('/users', usersRoutes)
routes.use('/integrations', EnsureAuthenticated, integrationsRoutes)
routes.use('/products', EnsureAuthenticated, productsRoutes)
routes.use('/notifications', EnsureAuthenticated, notificationsRoutes)

routes.use(bullDashboardRoutes)

export { routes }
