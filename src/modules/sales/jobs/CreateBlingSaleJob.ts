import { IAccountsRepository } from '@modules/accounts/repositories/IAccountsRepository'
import { Job } from '@shared/libs/Queue'
import { blingApi } from '@shared/services/BlingApi'
import qs from 'qs'
import { container } from 'tsyringe'
import xmlbuilder from 'xmlbuilder'
import { Sell } from '../infra/typeorm/entities/Sell'
import { ISalesRepository } from '../repositories/ISalesRepository'

export interface HandleData {
  data: {
    sell: Sell
  }
}

export default {
  name: 'CreateBlingSale',
  async handle({ data }: HandleData) {
    const { sell } = data

    const accountsRepository =
      container.resolve<IAccountsRepository>('AccountsRepository')
    const salesRepository =
      container.resolve<ISalesRepository>('SalesRepository')

    const account = await accountsRepository.findById(sell.account_id)
    const supplierIntegration = await salesRepository.getSupplierIntegration(
      sell.id
    )
    const sellItems = await salesRepository.getSellProduct(sell.id)

    const bling = blingApi(supplierIntegration.access_token)

    const xmlObject = {
      pedido: {
        cliente: {
          nome: account.name,
        },
        itens: [
          {
            item: {
              codigo: sellItems.sku,
              descricao: sellItems.name,
              qtde: sell.quantity,
              vlr_unit: sellItems.price / 100,
            },
          },
        ],
        obs_internas: `Pedido: ${sell.id} | Id da venda na integração do cliente: ${sell.integration_order_id}`,
      },
    }

    const xml = xmlbuilder.create(xmlObject).end({ pretty: true })

    //Create oononmiomndsoi
    await bling.post('pedido', qs.stringify({ xml }), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })

    //delete temporarily
    // await salesRepository.delete(sell.id)
  },
} as Job
