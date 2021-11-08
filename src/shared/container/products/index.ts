import { container } from 'tsyringe'

import { ProductsRepository } from '@modules/products/infra/typeorm/repositories/ProductsRepository'
import { IProductsRepository } from '@modules/products/repositories/IProductsRepository'

import { ProductImagesRepository } from '@modules/products/infra/typeorm/repositories/ProductImagesRepository'
import { IProducImageRepository } from '@modules/products/repositories/IProducImageRepository'

container.registerSingleton<IProductsRepository>(
  'ProductsRepository',
  ProductsRepository
)

container.registerSingleton<IProducImageRepository>(
  'ProductImagesRepository',
  ProductImagesRepository
)
