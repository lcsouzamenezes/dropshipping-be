import { Account } from '@modules/accounts/infra/typeorm/entities/Account'
import { Listing } from '@modules/listings/infra/typeorm/entities/Listing'
import { BaseEntity } from '@shared/infra/typeorm/entities/BaseEntity'
import { Expose } from 'class-transformer'
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'

@Entity('sales')
export class Sell extends BaseEntity {
  STORAGE_PATH = 'sales'

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

  @Column({
    nullable: true,
  })
  receipt?: string

  @Expose({
    name: 'receipt_url',
  })
  receipt_url(): string {
    if (!this.receipt) return
    switch (process.env.STORAGE) {
      case 'local':
        return `${process.env.APP_HOST}/storage/${this.STORAGE_PATH}/${this.receipt}`
      default:
        return null
    }
  }

  @Column({
    nullable: true,
  })
  invoice?: string

  @Expose({
    name: 'invoice_url',
  })
  invoice_url(): string {
    if (!this.invoice) return
    switch (process.env.STORAGE) {
      case 'local':
        return `${process.env.APP_HOST}/storage/${this.STORAGE_PATH}/${this.invoice}`
      default:
        return null
    }
  }

  @Column({
    nullable: true,
  })
  label?: string

  @Expose({
    name: 'label_url',
  })
  label_url(): string {
    if (!this.label) return
    switch (process.env.STORAGE) {
      case 'local':
        return `${process.env.APP_HOST}/storage/${this.STORAGE_PATH}/${this.label}`
      default:
        return null
    }
  }
}
