import { NextFunction } from 'express'
import http from 'http'
import { Server, Socket } from 'socket.io'
import { verifyToken } from '@utils/verifyToken'

function connectSocketIo(server: http.Server) {
  const io = new Server(server, {
    cors: {
      origin: process.env.CLIENT_HOST,
      methods: ['GET', 'POST'],
    },
  })

  io.use(async (socket: Socket, next: NextFunction) => {
    const token = socket.handshake.auth?.token
    if (token) {
      try {
        const user = await verifyToken(token)
        Object.assign(socket.data, {
          user_id: user.id,
        })
        next()
      } catch (error) {
        next(error)
      }
    } else {
      socket.disconnect()
    }
  })

  io.on('connection', (socket) => {
    console.log('socket connected', socket.id)
    io.on('disconnect', (socket) => {
      console.log('socket disconnected', socket.id)
    })
  })
}

export { connectSocketIo }
