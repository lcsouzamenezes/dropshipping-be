import { container } from 'tsyringe'

import { ProductsRepository } from '@modules/products/infra/typeorm/repositories/ProductsRepository'
import { IProductsRepository } from '@modules/products/repositories/IProductsRepository'

container.registerSingleton<IProductsRepository>(
  'ProductsRepository',
  ProductsRepository
)
