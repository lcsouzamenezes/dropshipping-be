import express from 'express'
import cors from 'cors'
import 'express-async-errors'

import dotenv from 'dotenv'
dotenv.config()

import createConnection from '@shared/infra/typeorm'
import { routes } from './routes'

import '@shared/container'
import '../../events'
import { ErrorHandler } from './middlewares/ErrorMiddleware'

createConnection()

const app = express()

app.use(
  cors({
    origin: 'http://localhost:3000',
    exposedHeaders: ['X-Total-Count'],
  })
)

app.use(express.json())

app.use(routes)

app.use(ErrorHandler)

export { app }
