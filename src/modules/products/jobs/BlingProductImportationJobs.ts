import { Integration } from '@modules/integrations/infra/typeorm/entities/Integration'
import { Bling } from '@shared/libs/Bling'
import { Job } from '@shared/libs/Queue'
import { Product } from '../infra/typeorm/entities/Product'

interface Handle {
  data: {
    integration: Integration
    update: boolean
  }
}

export default {
  name: 'BlingProductImportation',
  async handle({ data }: Handle) {
    const { access_token, account_id } = data.integration
    const blingApi = new Bling(access_token)

    let page = 1
    let hasMorePages = true

    while (hasMorePages) {
      const { produtos: products } = await blingApi.getProducts(page)

      const mappedProducts = products.map(({ produto: item }) => {
        const product = new Product()
        Object.assign(product, {
          name: item.descricao,
          sku: item.codigo,
          price: Math.trunc(item.preco * 100),
          stock: item.estoqueAtual,
          account_id,
        } as Product)
        return product
      })

      const saveManyResponse = await this.productsRepository.saveMany(
        mappedProducts,
        data.update
      )

      page++
      // if (products.length < 100) {
      hasMorePages = false
      // }
    }
  },
} as Job
