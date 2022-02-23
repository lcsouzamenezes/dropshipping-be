import { IAccountsSuppliersAuthorizationsRepository } from '@modules/accounts/repositories/IAccountsSuppliersAuthorizationsRepository'
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
    private productsRepository: IProductsRepository,
    @inject('AccountsSuppliersAuthorizationsRepository')
    private accountsSuppliersAuthorizationsRepository: IAccountsSuppliersAuthorizationsRepository
  ) {}

  async execute({
    account_id,
    search,
    supplier,
  }: ExecuteData): Promise<Product[]> {
    const authorizedSuppliers = (
      await this.accountsSuppliersAuthorizationsRepository.getAuthorizedByAccountId(
        account_id
      )
    ).map((supplier) => supplier.supplier_id)

    if (!authorizedSuppliers.length) {
      return []
    }

    const products = await this.productsRepository.getAllFromSuppliers({
      search,
      supplier,
      authorizedSuppliers,
    })

    return products
  }
}

export { ListSuppliersProductsService }
