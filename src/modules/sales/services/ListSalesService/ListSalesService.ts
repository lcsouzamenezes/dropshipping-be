import { SalesMapper } from '@modules/sales/mappers/SalesMapper'
import { ISalesRepository } from '@modules/sales/repositories/ISalesRepository'
import { IAccountsRepository } from '@modules/accounts/repositories/IAccountsRepository'
import { inject, injectable } from 'tsyringe'
import { AppError } from '@shared/errors/AppError'
import { Sell } from '@modules/sales/infra/typeorm/entities/Sell'

@injectable()
export class ListSalesService {
  constructor(
    @inject('SalesRepository')
    private salesRepository: ISalesRepository,
    @inject('AccountsRepository')
    private accountsRepository: IAccountsRepository
  ) {}

  async execute(account_id: string) {
    const account = await this.accountsRepository.findById(account_id)

    if (!account) {
      throw new AppError('Account not found', 'sales:list_sales', 404)
    }

    let sales: Sell[]
    if (account.type === 'supplier') {
      sales = await this.salesRepository.getBySupplierId(account.id)
    } else {
      sales = await this.salesRepository.getByAccountId(account_id)
    }

    const salesDTO = sales.map((sell) => SalesMapper.toDTO(sell))

    return salesDTO
  }
}
