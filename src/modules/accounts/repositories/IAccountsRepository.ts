import { ICreateAccountDTO } from '../dtos/ICreateAccountDTO'
import { Account } from '../infra/typeorm/entities/Account'

type ICreateData = Pick<ICreateAccountDTO, 'name' | 'type' | 'active'>

interface IAccountsRepository {
  create(data: ICreateData): Promise<Account>
  delete(id: string): Promise<void>
  findById(id: string): Promise<Account>
}

export { IAccountsRepository }
