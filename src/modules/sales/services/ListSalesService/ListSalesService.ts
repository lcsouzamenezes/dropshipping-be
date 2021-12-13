import { SalesMapper } from '@modules/sales/mappers/SalesMapper'
import { ISalesRepository } from '@modules/sales/repositories/ISalesRepository'
import { inject, injectable } from 'tsyringe'

@injectable()
export class ListSalesService {
  constructor(
    @inject('SalesRepository')
    private salesRepository: ISalesRepository
  ) {}

  async execute(account_id: string) {
    const sales = await this.salesRepository.getByAccountId(account_id)

    const salesDTO = sales.map((sell) => SalesMapper.toDTO(sell))

    return salesDTO
  }
}
