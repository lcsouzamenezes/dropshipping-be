import { IStorageProvider } from '../IStorageProvider'
import { resolve } from 'path'

export class FakeStorageProvider implements IStorageProvider {
  files = []

  async save(file: string, destination: string): Promise<string> {
    this.files.push(resolve(destination, file))
    return file
  }

  async delete(file: string, path: string): Promise<void> {
    const index = this.files.find((file) => file === resolve(path, file))
    delete this.files[index]
  }
}
