import { IIntegrationsRepository } from '@modules/integrations/repositories/IIntegrationsRepository'
import { IListingsRepository } from '@modules/listings/repositories/IListingsRepository'
import { Job } from '@shared/libs/Queue'
import { MercadolivreAPI } from '@shared/services/MercadolivreAPI'
import axios from 'axios'
import { container } from 'tsyringe'
import { Product } from '../infra/typeorm/entities/Product'

interface HandleData {
  product: Product
  old_stock: number
}

export default {
  name: 'UpdateMercadoLivreListingsStocks',
  async handle({ data: { product, old_stock } }: { data: HandleData }) {
    const integrationsRepository = container.resolve<IIntegrationsRepository>(
      'IntegrationsRepository'
    )
    const listingsRepository =
      container.resolve<IListingsRepository>('ListingsRepository')
    /* const integration = await integrationsRepository.findById(
      product.integration_id,
      product.account_id
    ) */
    const listings = await listingsRepository.getByProductId(
      product.id,
      product.account_id
    )

    for await (let listing of listings) {
      try {
        const meliIntegration = await integrationsRepository.findById(
          listing.integration_id,
          listing.account_id
        )
        const meliApi = await MercadolivreAPI(meliIntegration)

        if (listing.parent_code) {
          //get all variations stocks
          const { data: meliItem } = await meliApi.get<{
            variations: Array<{ id: string; available_quantity: number }>
          }>(`/items/${listing.parent_code}`)

          const updateVariations = meliItem.variations.map((item) => {
            if (listing.code.replaceAll(/\D/g, '') == item.id) {
              return {
                id: item.id,
                available_quantity: Math.floor(product.stock),
              }
            }

            return {
              id: item.id,
              available_quantity: item.available_quantity,
            }
          })

          await meliApi.put(`/items/${listing.parent_code}`, {
            variations: [...updateVariations],
          })
        } else {
          await meliApi.put(`/items/${listing.code}`, {
            available_quantity: Math.floor(product.stock),
          })
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          //Possible errors:
          // free listings max is 1
          console.error(error.response.data)
        }
        throw Error(error)
      }
    }
  },
  onFailed: (job, error) => {},
} as Job
