import { SalesRepository } from '@modules/sales/repositories/in-memory/SalesRepository'
import { FakeStorageProvider } from '@shared/providers/StorageProvider/fakes/FakeStorageProvider'
import { IFiles, UploadFilesService } from './UploadFilesService'

let salesRepository: SalesRepository
let storageProvider: FakeStorageProvider
let uploadFilesService: UploadFilesService

describe('UploadFilesService', () => {
  beforeEach(() => {
    salesRepository = new SalesRepository()
    storageProvider = new FakeStorageProvider()
    uploadFilesService = new UploadFilesService(
      salesRepository,
      storageProvider
    )
  })

  it('should be able to save uploaded files to sales repository', async () => {
    const files: IFiles = {
      receipt: [
        {
          filename: 'test_receipt_file.jpg',
        },
      ],
      label: [
        {
          filename: 'test_label_file.jpg',
        },
      ],
      invoice: [
        {
          filename: 'test_invoice_file.jpg',
        },
      ],
    }

    const sale = await salesRepository.create({
      account_id: 'ftYKaqlr7IIRrdddQ7BGLSPtg5ySniBj',
      integration_order_id: 'sQ1ug6Zli7vzxxbIMo9HBCdqUWUGg7y2',
      listing_id: 'xwgtmH1s9XMq1nQHXNtSwCD2MqR0kCeu',
      quantity: 1,
    })

    const sell = await uploadFilesService.execute({ id: sale.id, files })
    expect(sell.receipt).toBe(files.receipt[0].filename)
    expect(sell.invoice).toBe(files.invoice[0].filename)
    expect(sell.label).toBe(files.label[0].filename)
  })
})
