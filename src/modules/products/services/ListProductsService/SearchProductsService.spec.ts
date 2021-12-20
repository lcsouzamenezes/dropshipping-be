import { ProductsRepository } from '@modules/products/repositories/in-memory/ProductsRepository'
import { SearchProductsService } from './SearchProductService'

let productsRepository: ProductsRepository
let searchProductsService: SearchProductsService

describe('SearchProductsService', () => {
  beforeAll(() => {
    productsRepository = new ProductsRepository()
    searchProductsService = new SearchProductsService(productsRepository)
  })

  it('should be able to list products', async () => {
    const integration_id = '54168521964941701896944134885642'
    const account_id = '12146592412258710025858970858453'

    await productsRepository.saveMany([
      {
        id: '69727435412411220349845408177918',
        name: 'Product sample 1',
        sku: '399934867413',
        price: 100,
        stock: 2,
        ean: '3281271275774',
        account_id,
        integration_id,
        integration_product_code: 'MTngs2cTucCA',
      },
      {
        id: '73858204060742418183920576949873',
        name: 'Product sample 2',
        sku: '197381089099',
        price: 1200,
        stock: 10,
        ean: '6218666022074',
        account_id,
        integration_id,
        integration_product_code: 'MTngs2cTucCA',
      },
    ])

    const products = await searchProductsService.execute({
      search: 'sample 2',
      account_id,
    })

    expect(products).toHaveLength(1)
  })
})
