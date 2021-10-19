import { Router } from 'express'
import { usersRoutes } from './users.routes'
import { accountsRoutes } from './accounts.routes'
import { sessionsRoutes } from './sessions.routes'
import { integrationsRoutes } from './integrations.routes'
import { EnsureAuthenticated } from '../middlewares/EnsureAuthenticated'

const routes = Router()

routes.use('/sessions', sessionsRoutes)
routes.use('/accounts', accountsRoutes)
routes.use('/users', usersRoutes)
routes.use('/integrations', EnsureAuthenticated, integrationsRoutes)

export { routes }
