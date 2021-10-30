import { ICacheProvider, Options } from '../ICacheProvider'
import Cache from 'node-cache'

import nodeCacheConfig from '@config/nodeCache'

class NodeCache implements ICacheProvider {
  private cache: Cache

  constructor() {
    this.cache = new Cache(nodeCacheConfig)
  }

  async set<T = any>(key: string, value: T, opt?: Options): Promise<boolean> {
    return this.cache.set(key, value, opt?.ttl)
  }
  async get<T = unknown>(key: string): Promise<T> {
    return await this.cache.get(key)
  }
  async flush(): Promise<void> {
    this.cache.flushAll()
  }
}

export { NodeCache }
