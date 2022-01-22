import fs from 'fs'
import { resolve } from 'path'
import { S3 } from 'aws-sdk'
import { IStorageProvider } from '../IStorageProvider'
import uploadConfig from '@config/upload'
import mime from 'mime'

export class S3StorageProvider implements IStorageProvider {
  private client: S3

  constructor() {
    this.client = new S3({
      region: process.env.AWS_REGION,
      endpoint: `https://${process.env.AWS_BUCKET}.${process.env.AWS_REGION}.amazonaws.com`,
    })
  }

  async save(file: string, destination: string): Promise<string> {
    const originalName = resolve(uploadConfig.diskStorageFolder, file)
    const fileContent = fs.readFileSync(originalName)
    const contentType = mime.getType(originalName)
    await this.client
      .putObject({
        Bucket: `${process.env.AWS_BUCKET}/${destination}`,
        Key: file,
        ACL: 'public-read',
        Body: fileContent,
        ContentType: contentType,
      })
      .promise()

    fs.unlinkSync(originalName)

    return file
  }
  async delete(file: string, path: string): Promise<void> {
    await this.client
      .deleteObject({
        Bucket: `${process.env.AWS_BUCKET}/${path}`,
        Key: file,
      })
      .promise()
  }
}
