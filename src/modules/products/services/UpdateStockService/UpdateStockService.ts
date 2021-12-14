import { IIntegrationsRepository } from '@modules/integrations/repositories/IIntegrationsRepository'
import { IUpdateProductStockDTO } from '@modules/products/dtos/IUpdateProductStockDTO'
import { Product } from '@modules/products/infra/typeorm/entities/Product'
import { IProductsRepository } from '@modules/products/repositories/IProductsRepository'
import { AppError } from '@shared/errors/AppError'
import { EventProvider } from '@shared/providers/EventProvider/EventProvider'
import { container, inject, injectable } from 'tsyringe'
import { convertCompilerOptionsFromJson } from 'typescript'

@injectable()
export class UpdateStockService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
    @inject('IntegrationsRepository')
    private integrationsRepository: IIntegrationsRepository
  ) {}
  async execute({
    code,
    stock,
    integration_id,
  }: IUpdateProductStockDTO): Promise<Product> {
    const events = container.resolve(EventProvider)

    const integration = await this.integrationsRepository.findById(
      integration_id
    )

    if (!integration) {
      throw new AppError(
        'Invalid integration',
        'update_stock:invalid_integration',
        404
      )
    }

    const product = await this.productsRepository.findByIntegrationProductCode({
      code,
      account_id: integration.account_id,
    })

    if (!product) {
      throw new AppError(
        'Product not found.',
        'update_stock:product_not_found',
        404
      )
    }

    if (integration.id !== product.integration_id) {
      throw new AppError(
        'Integrations mismatch',
        'update_stock:integration_mismatch',
        404
      )
    }

    const old_stock = product.stock

    Object.assign(product, {
      stock,
    })

    await this.productsRepository.save(product)

    events.emit('stockUpdated', { product, old_stock })

    return product
  }
}
