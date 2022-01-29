import { container, InjectionToken } from 'tsyringe'
import { IStorageProvider } from './IStorageProvider'

import { DiskStorage } from './implementations/DiskStorage'
import { S3StorageProvider } from './implementations/S3StorageProvider'

let storageProvider: InjectionToken<IStorageProvider>

switch (process.env.STORAGE) {
  case 's3':
    storageProvider = S3StorageProvider
    break
  case 'local':
    storageProvider = DiskStorage
    break
  default:
    storageProvider = DiskStorage
    break
}
container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  storageProvider
)
