import { resolve } from 'path'
import crypto from 'crypto'
import multer from 'multer'

const tempFolder = resolve(__dirname, '..', '..', 'tmp')
const diskStorageFolder = resolve(__dirname, '..', '..', 'storage')

export default {
  tempFolder,
  diskStorageFolder,
  storage: multer.diskStorage({
    destination: tempFolder,
    filename(request, file, callback) {
      const fileHash = crypto.randomBytes(16).toString('HEX')
      const fileName = `${fileHash}-${file.originalname}`

      return callback(null, fileName)
    },
  }),
}
