import { BaseEntity } from '@shared/infra/typeorm/entities/BaseEntity'
import { Column, Entity, ManyToOne } from 'typeorm'
import { Account } from './Account'

@Entity('account_suppliers_authorization')
class AccountSupplierAuthorization extends BaseEntity {
  @Column()
  account_id!: string
  @Column()
  supplier_id!: string
  @Column()
  authorized!: boolean

  @ManyToOne(() => Account, (account) => account.authorized_suppliers)
  account!: Account

  @ManyToOne(() => Account, (account) => account.authorized_suppliers)
  supplier!: Account
}

export { AccountSupplierAuthorization }
