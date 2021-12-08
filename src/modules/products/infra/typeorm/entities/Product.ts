import { Account } from '@modules/accounts/infra/typeorm/entities/Account'
import { Integration } from '@modules/integrations/infra/typeorm/entities/Integration'
import { Listing } from '@modules/listings/infra/typeorm/entities/Listing'
import { BaseEntity } from '@shared/infra/typeorm/entities/BaseEntity'
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm'
import { ProductImage } from './ProductImage'

@Entity('products')
class Product extends BaseEntity {
  @Column()
  name: string

  @Column()
  sku: string

  @Column({
    type: 'integer',
  })
  price: number

  @Column({
    type: 'decimal',
  })
  stock: number

  @Column({ nullable: true })
  ean?: string

  @OneToMany(() => ProductImage, (image) => image.product, {
    cascade: true,
  })
  @JoinColumn({ name: 'product_id' })
  images?: ProductImage[]

  @Column()
  account_id: string

  @Column()
  integration_id: string

  @ManyToOne(() => Integration, (integration) => integration.products)
  @JoinColumn({ name: 'integration_id' })
  integration?: Integration

  @ManyToOne(() => Account, (account) => account.products, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'account_id' })
  account?: Account

  @OneToMany(() => Listing, (listing) => listing.product)
  listings: Listing[]
}

export { Product }
