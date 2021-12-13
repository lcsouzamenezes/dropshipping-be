import { ProductsRepository } from '@modules/products/repositories/in-memory/ProductsRepository'
import { UpdateStockService } from './UpdateStockService'

let productsRepository: ProductsRepository
let updateStockService: UpdateStockService

describe('UpdateStockService', () => {
  beforeAll(() => {
    productsRepository = new ProductsRepository()
    updateStockService = new UpdateStockService(productsRepository)
  })

  it('should be able to update product stock', async () => {
    const account_id = 'dLyIL11gDqvsbnKA5aMwX4BEbYzjPrTt'

    const product = await productsRepository.save({
      account_id,
      name: 'Hannah Freeman',
      price: 100,
      stock: 2,
      sku: 'teste',
      integration_product_code: 'k8Zn2z4P7WyN',
      integration_id: 'xlbzXbfsp73hgBcpgt5iEm9OgbFyBCc2',
    })

    await updateStockService.execute({
      account_id,
      code: product.integration_product_code,
      stock: 2,
    })

    const updatedProduct = await productsRepository.findById({
      id: product.id,
      account_id,
    })

    expect(updatedProduct.stock).toBe(2)
  })
})
