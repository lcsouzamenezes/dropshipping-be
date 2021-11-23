import { Product } from '@modules/products/infra/typeorm/entities/Product'
import { IProductsRepository } from '@modules/products/repositories/IProductsRepository'
import { inject, injectable } from 'tsyringe'

interface ExecuteData {
  account_id: string
  search?: string
  supplier?: string
}

@injectable()
class ListSuppliersProductsService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository
  ) {}

  async execute({
    account_id,
    search,
    supplier,
  }: ExecuteData): Promise<Product[]> {
    //TODO: use account_id to determine what suppliers has approved the user

    const products = await this.productsRepository.getAllFromSuppliers({
      search,
      supplier,
    })

    return products
  }
}

export { ListSuppliersProductsService }
