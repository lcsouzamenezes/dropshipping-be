import { Integration } from '@modules/integrations/infra/typeorm/entities/Integration'
import { Product } from '@modules/products/infra/typeorm/entities/Product'
import { IProductsRepository } from '@modules/products/repositories/IProductsRepository'
import { Bling } from '@shared/libs/Bling'
import { EventProvider } from '@shared/providers/EventProvider/EventProvider'
import { container, inject, injectable } from 'tsyringe'
import { BlingProductsImportationEndedData } from '@modules/products/listeners/BlingProductsImportationEnded'

export interface Statistics {
  newUpdates: number
  errors: Array<{
    message: string
    code: string
  }>
}

@injectable()
class ImportBlingProductsService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository
  ) {}

  async execute(integration: Integration, update?: boolean) {
    const { id: integration_id, access_token, account_id } = integration
    const blingApi = new Bling(access_token)
    const event = container.resolve(EventProvider)

    event.emit('blingProductsImportationStart', integration.account_id)

    const statistics: Statistics = {
      newUpdates: 0,
      errors: [],
    }

    await blingApi.getAllProducts(
      async (response) => {
        const products = response.produtos
        const mappedProducts = products.map(({ produto: item }) => {
          const mappedProduct = new Product()
          Object.assign(mappedProduct, {
            name: item.descricao,
            sku: item.codigo,
            price: Math.trunc(item.preco * 100) ?? 0,
            stock: item.estoqueAtual ?? 0,
            ean: item.gtin,
            account_id,
            integration_id,
          } as Product)
          return mappedProduct
        })
        const { products: newProducts, errors } =
          await this.productsRepository.saveMany(mappedProducts, update)
        statistics.errors.concat(errors)
        statistics.newUpdates += newProducts
      },
      1,
      400
    )

    event.emit('blingProductsImportationEnded', {
      account_id,
      message: `Produtos atualizados: ${statistics.newUpdates}, produtos com falha: ${statistics.errors.length}`,
      type: 'success',
    } as BlingProductsImportationEndedData)
  }
}
export { ImportBlingProductsService }
