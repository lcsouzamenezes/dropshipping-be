import http from 'http'
import { app } from './app'
import { connectSocketIo } from './socket'

import config from '@config/app'

const { port } = config

const server = http.createServer(app)

connectSocketIo(server)

server.listen(port, () => {
  console.log(`🚀 server running on port: ${port}`)
})
