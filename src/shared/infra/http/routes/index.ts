import { Router } from 'express'
import { EnsureAuthenticated } from '../middlewares/EnsureAuthenticated'
import { accountsRoutes } from './accounts.routes'
import { bullDashboardRoutes } from './bulldashboard.routes'
import { callbacksRoutes } from './callbacks.routes'
import { catalogRoutes } from './catalog.routes'
import { integrationsRoutes } from './integrations.routes'
import { listingsRoutes } from './listings.routes'
import { metricsRoutes } from './metrics.routes'
import { notificationsRoutes } from './notifications.routes'
import { productsRoutes } from './products.routes'
import { profilesRoutes } from './profiles.routes'
import { salesRoutes } from './sales.routes'
import { sessionsRoutes } from './sessions.routes'
import { suppliersRoutes } from './suppliers.routes'
import { usersRoutes } from './users.routes'

const routes = Router()

routes.use('/sessions', sessionsRoutes)
routes.use('/accounts', accountsRoutes)
routes.use('/users', usersRoutes)
routes.use('/integrations', EnsureAuthenticated, integrationsRoutes)
routes.use('/products', EnsureAuthenticated, productsRoutes)
routes.use('/catalog', EnsureAuthenticated, catalogRoutes)
routes.use('/notifications', EnsureAuthenticated, notificationsRoutes)
routes.use('/suppliers', EnsureAuthenticated, suppliersRoutes)
routes.use('/listings', EnsureAuthenticated, listingsRoutes)
routes.use('/sales', EnsureAuthenticated, salesRoutes)
routes.use('/profiles', EnsureAuthenticated, profilesRoutes)
routes.use('/metrics', EnsureAuthenticated, metricsRoutes)

routes.use('/callbacks', callbacksRoutes)

routes.use(bullDashboardRoutes)

export { routes }
