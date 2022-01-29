export interface IStorageProvider {
  save(file: string, destination: string): Promise<string>
  delete(file: string, path: string): Promise<void>
}
