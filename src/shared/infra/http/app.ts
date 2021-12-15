import 'reflect-metadata'
import 'dotenv/config'

import express from 'express'
import cors from 'cors'
import 'express-async-errors'

import createConnection from '../typeorm'

import '@shared/container'
import '../../events'

import { routes } from './routes'
import { ErrorHandler } from './middlewares/ErrorMiddleware'

const app = express()

createConnection()

app.use(
  cors({
    exposedHeaders: ['X-Total-Count'],
  })
)

app.use(express.json())

app.use(routes)

app.use(ErrorHandler)

export { app }
