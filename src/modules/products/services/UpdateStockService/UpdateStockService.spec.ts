import { Integration } from '@modules/integrations/infra/typeorm/entities/Integration'
import { IntegrationsRepository } from '@modules/integrations/repositories/in-memory/IntegrationsRepository'
import { ProductsRepository } from '@modules/products/repositories/in-memory/ProductsRepository'
import { UpdateStockService } from './UpdateStockService'

let integrationsRepository: IntegrationsRepository
let productsRepository: ProductsRepository
let updateStockService: UpdateStockService

describe('UpdateStockService', () => {
  beforeAll(() => {
    integrationsRepository = new IntegrationsRepository()
    productsRepository = new ProductsRepository()
    updateStockService = new UpdateStockService(
      productsRepository,
      integrationsRepository
    )
  })

  it('should be able to update product stock', async () => {
    const account_id = 'dLyIL11gDqvsbnKA5aMwX4BEbYzjPrTt'

    const integration = await integrationsRepository.create(
      {
        provider: 'bling',
        description: 'Bling',
        access_token: 'n6g1YAE7RJzHAZC2nwQK9PcDJZC39dsF',
      },
      account_id
    )

    const product = await productsRepository.save({
      account_id,
      name: 'Hannah Freeman',
      price: 100,
      stock: 2,
      sku: 'teste',
      integration_product_code: 'k8Zn2z4P7WyN',
      integration_id: integration.id,
    })

    await updateStockService.execute({
      code: product.integration_product_code,
      stock: 2,
      integration_id: integration.id,
    })

    const updatedProduct = await productsRepository.findById({
      id: product.id,
    })

    expect(updatedProduct.stock).toBe(2)
  })
})
