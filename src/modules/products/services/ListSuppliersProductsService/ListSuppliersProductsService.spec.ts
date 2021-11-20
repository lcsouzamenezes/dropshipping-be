import { Account } from '@modules/accounts/infra/typeorm/entities/Account'
import { Product } from '@modules/products/infra/typeorm/entities/Product'
import { ProductsRepository } from '@modules/products/repositories/in-memory/ProductsRepository'
import { ListSuppliersProductsService } from './ListSuppliersProductsService'

let productsRepository: ProductsRepository
let listSuppliersProductsService: ListSuppliersProductsService

describe('ListSuppliersProductsService', () => {
  beforeEach(() => {
    productsRepository = new ProductsRepository()
    listSuppliersProductsService = new ListSuppliersProductsService(
      productsRepository
    )
  })

  it('Should be able to list all products from available suppliers', async () => {
    const account = new Account()
    Object.assign(account, {
      name: 'Lilly Wilkerson',
      type: 'supplier',
      active: true,
    })
    const product = new Product()
    Object.assign(product, {
      name: 'Teste product',
      price: '10000',
      sku: 'wYTV5lEVmKhm',
      account,
      stock: '1',
      account_id: account.id,
      integration_id: 'qDpeMhd2GI9CPvI0uYAWEvhBFWPMjKSM',
    })

    productsRepository.save(product)

    const products = await listSuppliersProductsService.execute(account.id)

    expect(products).toHaveLength(1)
  })

  it('Should not be able to list products from inactive suppliers', async () => {
    const account = new Account()
    Object.assign(account, {
      name: 'Lilly Wilkerson',
      type: 'supplier',
      active: false,
    })
    const product = new Product()
    Object.assign(product, {
      name: 'Teste product',
      price: '10000',
      sku: 'wYTV5lEVmKhm',
      account,
      stock: '1',
      account_id: account.id,
      integration_id: 'qDpeMhd2GI9CPvI0uYAWEvhBFWPMjKSM',
    })

    productsRepository.save(product)

    const products = await listSuppliersProductsService.execute(account.id)

    expect(products).toHaveLength(0)
  })
})
