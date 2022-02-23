import { User } from '@modules/users/infra/typeorm/entities/User'
import { BaseEntity } from '@shared/infra/typeorm/entities/BaseEntity'
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
} from 'typeorm'
import { Exclude } from 'class-transformer'
import { Integration } from '@modules/integrations/infra/typeorm/entities/Integration'
import { Product } from '@modules/products/infra/typeorm/entities/Product'
import { Notification } from '@modules/notifications/infra/typeorm/entities/Notification'
import { Listing } from '@modules/listings/infra/typeorm/entities/Listing'
import { Sell } from '@modules/sales/infra/typeorm/entities/Sell'
import { Profile } from '@modules/profiles/infra/typeorm/entities/Profile'
import { Address } from '@modules/addresses/infra/typeorm/entities/Address'
import { AccountSupplierAuthorization } from './AccountSupplierAuthorization'

@Entity('accounts')
class Account extends BaseEntity {
  @Column()
  name: string

  @Exclude()
  @Column({ default: true })
  active: boolean

  @Exclude()
  @Column({ default: 'client' })
  type: string

  @OneToOne(() => User, (user) => user.account)
  user: User

  @OneToMany(() => Integration, (integration) => integration.account)
  integrations: Integration[]

  @OneToMany(() => Notification, (notification) => notification.account)
  notifications: Notification[]

  @OneToMany(() => Product, (product) => product.account)
  products: Product[]

  @OneToMany(() => Product, (product) => product.account)
  listings: Listing[]

  @OneToMany(() => Sell, (sell) => sell.account)
  sales: Sell[]

  @OneToOne(() => Profile, (profile) => profile.account)
  profile: Profile

  @OneToMany(() => Address, (address) => address.account)
  addresses?: Address[]

  @ManyToMany(
    () => AccountSupplierAuthorization,
    (accountSupplierAuthorization) => accountSupplierAuthorization.account
  )
  authorized_suppliers: AccountSupplierAuthorization[]

  @ManyToMany(
    () => AccountSupplierAuthorization,
    (accountSupplierAuthorization) => accountSupplierAuthorization.account
  )
  @JoinTable()
  authorized_accounts: AccountSupplierAuthorization[]
}

export { Account }
