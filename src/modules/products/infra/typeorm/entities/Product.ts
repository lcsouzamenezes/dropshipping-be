import { Account } from '@modules/accounts/infra/typeorm/entities/Account'
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

  @OneToMany(() => ProductImage, (image) => image.product)
  images: ProductImage[]

  @Column()
  account_id: string

  @ManyToOne(() => Account, (account) => account.products, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'account_id' })
  account: Account
}

export { Product }
