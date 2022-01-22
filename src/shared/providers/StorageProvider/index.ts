import { container } from 'tsyringe'
import { IStorageProvider } from './IStorageProvider'

import { DiskStorage } from './implementations/DiskStorage'
import { S3StorageProvider } from './implementations/S3StorageProvider'

const storageProvider =
  process.env.STORAGE === 'DISK' ? DiskStorage : S3StorageProvider

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  storageProvider
)
