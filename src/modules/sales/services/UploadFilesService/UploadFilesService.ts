import { Sell } from '@modules/sales/infra/typeorm/entities/Sell'
import { ISalesRepository } from '@modules/sales/repositories/ISalesRepository'
import { AppError } from '@shared/errors/AppError'
import { EventProvider } from '@shared/providers/EventProvider/EventProvider'
import { IStorageProvider } from '@shared/providers/StorageProvider/IStorageProvider'
import { container, inject, injectable } from 'tsyringe'

export interface IFiles {
  [fieldname: string]: { filename: string }[]
}

@injectable()
export class UploadFilesService {
  constructor(
    @inject('SalesRepository')
    private salesRepository: ISalesRepository,
    @inject('StorageProvider')
    private storageProvider: IStorageProvider
  ) {}

  async execute(data: { id: string; files: IFiles }): Promise<Sell> {
    const events = container.resolve(EventProvider)

    const { id, files } = data

    const sale = await this.salesRepository.getById(id)

    if (!sale) {
      throw new AppError('Invalid Sale', 'upload_files:invalid_sale', 404)
    }

    if (files.receipt) {
      try {
        const oldFile = sale.receipt
        const filename = await this.storageProvider.save(
          files.receipt[0].filename,
          sale.STORAGE_PATH
        )
        sale.receipt = filename
        await this.salesRepository.update(sale)

        events.emit('new-sale-receipt', sale)

        if (oldFile) {
          await this.storageProvider.delete(oldFile, sale.STORAGE_PATH)
        }
      } catch (err) {
        console.error(err)
        throw new AppError(
          'Failed to save receipt',
          'upload_files:receipt_failed',
          500
        )
      }
    }

    if (files.invoice) {
      try {
        const oldFile = sale.invoice
        const filename = await this.storageProvider.save(
          files.invoice[0].filename,
          sale.STORAGE_PATH
        )
        sale.invoice = filename
        await this.salesRepository.update(sale)

        events.emit('new-sale-invoice', sale)

        if (oldFile) {
          await this.storageProvider.delete(oldFile, sale.STORAGE_PATH)
        }
      } catch (err) {
        throw new AppError(
          'Failed to save invoice',
          'upload_files:invoice_failed',
          500
        )
      }
    }

    if (files.label) {
      try {
        const oldFile = sale.label
        const filename = await this.storageProvider.save(
          files.label[0].filename,
          sale.STORAGE_PATH
        )
        sale.label = filename
        await this.salesRepository.update(sale)

        events.emit('new-sale-label', sale)

        if (oldFile) {
          await this.storageProvider.delete(oldFile, sale.STORAGE_PATH)
        }
      } catch (err) {
        throw new AppError(
          'Failed to save label',
          'upload_files:label_failed',
          500
        )
      }
    }

    return sale
  }
}
