import { Account } from '@modules/accounts/infra/typeorm/entities/Account'
import { Integration } from '@modules/integrations/infra/typeorm/entities/Integration'
import { Product } from '@modules/products/infra/typeorm/entities/Product'
import { Sell } from '@modules/sales/infra/typeorm/entities/Sell'
import { BaseEntity } from '@shared/infra/typeorm/entities/BaseEntity'
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from 'typeorm'

@Entity('listings')
class Listing extends BaseEntity {
  @Column()
  code: string

  @ManyToOne(() => Integration, (integration) => integration.listings)
  @JoinColumn({ name: 'integration_id' })
  integration: Integration

  @ManyToOne(() => Account, (account) => account.listings, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'account_id' })
  account: Account

  @Column()
  account_id: string

  @Column()
  integration_id: string

  @Column()
  active: boolean

  @ManyToMany((type) => Product)
  @JoinTable({
    name: 'listings_products',
    joinColumn: { name: 'listing_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'product_id', referencedColumnName: 'id' },
  })
  products: Product[]

  @OneToMany(() => Sell, (sell) => sell.listing)
  sales: Sell[]

  @Column({
    default: 'NULL',
    nullable: true,
  })
  parent_code?: string
}

export { Listing }
