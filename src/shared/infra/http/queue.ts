import 'dotenv/config'
import '@shared/container'
import '@shared/events'

import createConnection from '../typeorm'
import Queue from '@libs/Queue'

createConnection().then(() => {
  Queue.process()
})
