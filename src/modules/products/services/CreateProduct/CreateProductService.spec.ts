import { ProductsRepository } from '@modules/products/repositories/in-memory/ProductsRepository'
import { CreateProductService } from './CreateProductService'

let productsRepository: ProductsRepository
let createProductService: CreateProductService

describe('CreateProductService', () => {
  beforeEach(() => {
    productsRepository = new ProductsRepository()
    createProductService = new CreateProductService(productsRepository)
  })

  it('should be able to create a new product', async () => {
    const product = await createProductService.execute({
      name: 'Product Test',
      sku: '870699270023',
      price: 100,
      stock: 2,
      integration_product_code: 'ybY82Jchsl7I',
      account_id: '71050571508081459235326796190700',
      integration_id: '44288068044211383452069278293706',
    })

    expect(product).toHaveProperty('id')
  })
})
