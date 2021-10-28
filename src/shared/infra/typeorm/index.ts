import config from '@config/database'
import { Connection, createConnection, getConnectionOptions } from 'typeorm'

export default async (): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions()
  Object.assign(defaultOptions, config)

  return createConnection(defaultOptions)
}
