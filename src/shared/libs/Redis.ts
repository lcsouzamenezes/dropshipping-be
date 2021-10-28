import Redis from 'ioredis'
import config from '@config/redis'

async function createRedisClient(): Promise<Redis.Redis> {
  const client = new Redis({
    ...config,
  })

  return client
}

export { createRedisClient }
