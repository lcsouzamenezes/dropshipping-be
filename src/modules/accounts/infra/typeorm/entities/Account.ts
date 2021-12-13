import { User } from '@modules/users/infra/typeorm/entities/User'
import { BaseEntity } from '@shared/infra/typeorm/entities/BaseEntity'
import { Column, Entity, OneToMany, OneToOne } from 'typeorm'
import { Exclude } from 'class-transformer'
import { Integration } from '@modules/integrations/infra/typeorm/entities/Integration'
import { Product } from '@modules/products/infra/typeorm/entities/Product'
import { Notification } from '@modules/notifications/infra/typeorm/entities/Notification'
import { Listing } from '@modules/listings/infra/typeorm/entities/Listing'
import { Sell } from '@modules/sales/infra/typeorm/entities/Sell'

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
}

export { Account }
