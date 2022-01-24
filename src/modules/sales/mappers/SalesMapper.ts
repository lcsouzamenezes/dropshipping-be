import { Sell } from '../infra/typeorm/entities/Sell'
import { SellDTO } from '../dtos/SellDTO'
import { AccountsMapper } from '@modules/accounts/mappers/AccountsMapper'
import { ListingsMapper } from '@modules/listings/mappers/ListingsMapper'

export class SalesMapper {
  static toDTO(sell: Sell): SellDTO {
    const sellDTO = {
      id: sell.id,
      integration_order_id: sell.integration_order_id,
      quantity: sell.quantity,
      created_at: sell.created_at,
      updated_at: sell.updated_at,
      invoice: sell.invoice,
      invoice_url: sell.invoice_url(),
      label: sell.label,
      label_url: sell.label_url(),
      receipt: sell.receipt,
      receipt_url: sell.receipt_url(),
      ...(sell.account && { account: AccountsMapper.toDTO(sell.account) }),
      ...(sell.listing && { listing: ListingsMapper.toDTO(sell.listing) }),
    } as SellDTO
    return sellDTO
  }
}
