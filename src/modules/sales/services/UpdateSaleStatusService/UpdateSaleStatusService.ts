import { Sell } from '@modules/sales/infra/typeorm/entities/Sell'
import { ISalesRepository } from '@modules/sales/repositories/ISalesRepository'
import { AppError } from '@shared/errors/AppError'
import { inject, injectable } from 'tsyringe'

interface IUpdateSalesStatusProps {
  id: string
  account_id: string
  status: 'pending' | 'wait_shipment' | 'shipped' | 'done' | 'canceled'
}

@injectable()
class UpdateSaleStatusService {
  constructor(
    @inject('SalesRepository')
    private salesRepository: ISalesRepository
  ) {}

  async execute({
    id,
    account_id,
    status,
  }: IUpdateSalesStatusProps): Promise<Sell> {
    const sale = await this.salesRepository.getById(id)

    if (!sale) {
      throw new AppError(
        'Sale not found',
        'update_status:failed_to_update',
        404
      )
    }

    if (sale.account_id !== account_id) {
      throw new AppError(
        'Sale not found',
        'update_status:failed_to_update',
        404
      )
    }

    return await this.salesRepository.update({
      ...sale,
      status,
    })
  }
}

export { UpdateSaleStatusService }
