import { Account } from '@modules/accounts/infra/typeorm/entities/Account'
import { Listing } from '@modules/listings/infra/typeorm/entities/Listing'
import { BaseEntity } from '@shared/infra/typeorm/entities/BaseEntity'
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'

@Entity('sales')
export class Sell extends BaseEntity {
  @Column()
  integration_order_id: string

  @Column()
  listing_id: string

  @Column()
  account_id: string

  @Column()
  quantity: number

  @ManyToOne(() => Listing, (listing) => listing.sales, {
    cascade: true,
  })
  @JoinColumn({ name: 'listing_id' })
  listing: Listing

  @ManyToOne(() => Account, (account) => account.sales, {
    cascade: true,
  })
  @JoinColumn({ name: 'account_id' })
  account: Account
}
