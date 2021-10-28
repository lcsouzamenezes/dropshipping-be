import 'dotenv/config'
import '@shared/container'

import createConnection from '../typeorm'

createConnection()

import Queue from '@libs/Queue'

Queue.process()
