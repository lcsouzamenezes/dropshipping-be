import { Request, Response, NextFunction, Router } from 'express'

import { createBullBoard } from '@bull-board/api'
import { BullAdapter } from '@bull-board/api/bullAdapter'
import { ExpressAdapter } from '@bull-board/express'
import Queue from '@libs/Queue'

const bullDashboardRoutes = Router()

const serverAdapter = new ExpressAdapter()
createBullBoard({
  queues: Queue.queues.map((queue) => new BullAdapter(queue.bull)),
  serverAdapter,
})

serverAdapter.setBasePath('/admin/queues')
bullDashboardRoutes.use(
  '/admin/queues',
  (request: Request, response: Response, next: NextFunction): void => {
    const reject = () => {
      response.setHeader(
        'www-authenticate',
        'Basic realm="Queue monitor access", charset="UTF-8"'
      )
      response.sendStatus(401)
    }

    const authorization = request.headers.authorization

    if (!authorization) {
      return reject()
    }

    const [user, pass] = Buffer.from(
      authorization.replace('Basic ', ''),
      'base64'
    )
      .toString()
      .split(':')

    if (!(user === 'admin' && pass === 'Clubgroup99*')) {
      return reject()
    }
    return next()
  },
  serverAdapter.getRouter()
)

export { bullDashboardRoutes }
