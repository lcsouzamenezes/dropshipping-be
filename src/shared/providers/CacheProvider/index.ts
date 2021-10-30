import { container } from 'tsyringe'

import { ICacheProvider } from './ICacheProvider'
import { NodeCache } from './implementations/NodeCache'

container.registerSingleton<ICacheProvider>('CacheProvider', NodeCache)
