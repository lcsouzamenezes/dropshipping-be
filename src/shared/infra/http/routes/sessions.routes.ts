import { CreateSessionController } from '@modules/users/services/CreateSession/CreateSessionController'
import { RefreshTokenController } from '@modules/users/services/RefreshToken/RefreshTokenController'
import { Router } from 'express'

const sessionsRoutes = Router()
const createSessionController = new CreateSessionController()
const refreshTokenController = new RefreshTokenController()

sessionsRoutes.post('/', createSessionController.handle)
sessionsRoutes.post('/refresh', refreshTokenController.handle)

export { sessionsRoutes }
