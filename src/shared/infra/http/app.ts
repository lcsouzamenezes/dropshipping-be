import 'reflect-metadata'
import 'dotenv/config'

import express, { Request, Response, NextFunction } from 'express'
import cors from 'cors'
import 'express-async-errors'

import { createBullBoard } from '@bull-board/api'
import { BullAdapter } from '@bull-board/api/bullAdapter'
import { ExpressAdapter } from '@bull-board/express'
import Queue from '@libs/Queue'

import createConnection from '../typeorm'

import '@shared/container'
import '../../events'

import { routes } from './routes'
import { ErrorHandler } from './middlewares/ErrorMiddleware'

const app = express()

createConnection()

const serverAdapter = new ExpressAdapter()
createBullBoard({
  queues: Queue.queues.map((queue) => new BullAdapter(queue.bull)),
  serverAdapter,
})

serverAdapter.setBasePath('/admin/queues')
app.use(
  '/admin/queues',
  (request: Request, response: Response, next: NextFunction): void => {
    const reject = () => {
      response.setHeader('www-authenticate', 'Basic')
      response.sendStatus(401)
    }

    const authorization = request.headers.authorization

    if (!authorization) {
      return reject()
    }

    return next()
  },
  serverAdapter.getRouter()
)

app.use(
  cors({
    exposedHeaders: ['X-Total-Count'],
  })
)

app.use(express.json())

app.use(routes)

app.use(ErrorHandler)

export { app }
