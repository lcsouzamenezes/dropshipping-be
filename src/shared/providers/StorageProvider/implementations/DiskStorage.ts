import fs from 'fs-extra'
import { resolve } from 'path'

import uploadConfig from '@config/upload'

import { IStorageProvider } from '../IStorageProvider'

export class DiskStorage implements IStorageProvider {
  async save(file: string, destination: string = ''): Promise<string> {
    const storagePath = resolve(uploadConfig.diskStorageFolder, destination)

    fs.ensureDirSync(storagePath)

    fs.moveSync(
      resolve(uploadConfig.tempFolder, file),
      resolve(storagePath, file)
    )

    return file
  }
  async delete(file: string, path: string): Promise<void> {
    const filepath = resolve(uploadConfig.diskStorageFolder, path, file)
    try {
      fs.statSync(filepath)
      fs.unlinkSync(filepath)
    } catch (error) {
      return
    }
  }
}
