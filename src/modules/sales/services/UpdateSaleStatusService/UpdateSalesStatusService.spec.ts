import { SalesRepository } from '@modules/sales/repositories/in-memory/SalesRepository'
import { UpdateSaleStatusService } from './UpdateSaleStatusService'

let salesRepository: SalesRepository
let updateSaleStatusService: UpdateSaleStatusService

describe('UpdateSalesStatusService', () => {
  beforeEach(() => {
    salesRepository = new SalesRepository()
    updateSaleStatusService = new UpdateSaleStatusService(salesRepository)
  })

  it('should be able to update sale status', async () => {
    const account_id = 'jVLLFu07hVac3L46GnWk07Wsz2pLeYge'

    const sale = await salesRepository.create({
      account_id,
      integration_order_id: 'sQ1ug6Zli7vzxxbIMo9HBCdqUWUGg7y2',
      listing_id: 'az5k8OgMLqYiAYbfyqRRvblELPxhnygS',
      quantity: 1,
      status: 'pending',
    })

    const updatedSale = await updateSaleStatusService.execute({
      account_id,
      id: sale.id,
      status: 'shipped',
    })

    expect(updatedSale.status).toBe('shipped')
  })
})
