import { ProductsRepository } from '@modules/products/repositories/in-memory/ProductsRepository'
import { GetProductService } from './GetProductService'

let productsRepository: ProductsRepository
let getProductService: GetProductService

describe('GetProductService', () => {
  beforeAll(() => {
    productsRepository = new ProductsRepository()
    getProductService = new GetProductService(productsRepository)
  })

  it('shoul be able to list a product', async () => {
    const account_id = '00607762833707258202983482126310'

    const product = await productsRepository.save({
      account_id,
      name: 'Bill Stevens',
      integration_id: '38481852573852686496145910331684',
      price: 100,
      sku: '282587348462',
      stock: 1,
      integration_product_code: 'pWc2jBNisg4R',
    })

    const getProduct = await getProductService.execute({
      account_id,
      product_id: product.id,
    })

    expect(getProduct.id).toBe(product.id)
  })
})
