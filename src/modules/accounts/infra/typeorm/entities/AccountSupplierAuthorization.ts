import { BaseEntity } from '@shared/infra/typeorm/entities/BaseEntity'
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'
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
  @JoinColumn({ name: 'account_id' })
  account!: Account

  @ManyToOne(() => Account, (account) => account.authorized_suppliers)
  @JoinColumn({ name: 'supplier_id' })
  supplier!: Account
}

export { AccountSupplierAuthorization }
