import { Router } from 'express'
import { usersRoutes } from './users.routes'
import { accountsRoutes } from './accounts.routes'
import { sessionsRoutes } from './sessions.routes'
import { integrationsRoutes } from './integrations.routes'
import { EnsureAuthenticated } from '../middlewares/EnsureAuthenticated'
import { productsRoutes } from './products.routes'

const routes = Router()

routes.use('/sessions', sessionsRoutes)
routes.use('/accounts', accountsRoutes)
routes.use('/users', usersRoutes)
routes.use('/integrations', EnsureAuthenticated, integrationsRoutes)
routes.use('/products', EnsureAuthenticated, productsRoutes)

export { routes }
