import { IListingsRepository } from '@modules/listings/repositories/IListingsRepository'
import { ISalesRepository } from '@modules/sales/repositories/ISalesRepository'
import { CreateSaleService } from '@modules/sales/services/CreateSalesService/CreateSalesService'
import { MercadolivreNotification } from '@shared/infra/http/routes/callbacks.routes'
import { Job } from '@shared/libs/Queue'
import { MercadolivreAPI } from '@shared/services/MercadolivreAPI'
import { container } from 'tsyringe'
import { IIntegrationsRepository } from '../repositories/IIntegrationsRepository'

export interface HandleData {
  notification: MercadolivreNotification
}

interface OrderResource {
  id: number
  order_items: Array<{
    item: {
      id: string
    }
    quantity: number
  }>
}

export default {
  name: 'ProcessMercadolivreNotification',
  async handle({ data: { notification } }: { data: HandleData }) {
    switch (notification.topic) {
      case 'orders_v2':
        const integrationsRepository =
          container.resolve<IIntegrationsRepository>('IntegrationsRepository')
        const listingsRepository =
          container.resolve<IListingsRepository>('ListingsRepository')
        const createSellService = container.resolve(CreateSaleService)

        const salesRepository =
          container.resolve<ISalesRepository>('SalesRepository')

        const integration = await integrationsRepository.findByUserId(
          String(notification.user_id)
        )
        if (integration) {
          const mercadolivreApi = await MercadolivreAPI(integration)

          const { data } = await mercadolivreApi.get<OrderResource>(
            notification.resource
          )

          for (const { item, quantity } of data.order_items) {
            const orderId = notification.resource.replace(/\D+/g, '')

            const listing = await listingsRepository.findByCode(item.id)

            const sell = await salesRepository.getByIntegrationOrderId(orderId)

            if (
              !sell &&
              listing &&
              listing.account_id === integration.account_id
            ) {
              await createSellService.execute({
                account_id: integration.account_id,
                integration_order_id: orderId,
                listing_id: listing.id,
                quantity,
              })
            }
          }
        }

        break
      default:
        //do something or not with the notification
        break
    }
  },
} as Job
