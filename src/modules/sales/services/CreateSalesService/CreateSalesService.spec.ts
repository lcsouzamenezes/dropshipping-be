import { SalesRepository } from '@modules/sales/repositories/in-memory/SalesRepository'
import { EventProvider } from '@shared/providers/EventProvider/EventProvider'
import { container } from 'tsyringe'
import { CreateSaleService } from './CreateSalesService'

let salesRepository: SalesRepository
let createSellService: CreateSaleService

describe('CreateSellSpec', () => {
  beforeEach(() => {
    salesRepository = new SalesRepository()
    createSellService = new CreateSaleService(salesRepository)
  })

  it('should be able to create a sell', async () => {
    const events = container.resolve(EventProvider)

    const spyEmit = jest.spyOn(events, 'emit')

    const sell = await createSellService.execute({
      integration_order_id: '12333213',
      quantity: 2,
      listing_id: 'h7h4eIZKE6lahmflURgXRyrrimPtpoqE',
      account_id: 'qyfQlYCRcFQ9DiDzfw4TRbBYeky1Tcw2',
    })

    expect(spyEmit).toHaveBeenCalledWith('sell-created', { sell })

    expect(sell).toHaveProperty('id')
  })
})
