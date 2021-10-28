import { BaseEntity } from '@shared/infra/typeorm/entities/BaseEntity'
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'
import { Product } from './Product'

@Entity('product_images')
class ProductImage extends BaseEntity {
  @Column()
  url: string

  @Column({
    default: false,
  })
  external: boolean

  @Column()
  product_id: string

  @ManyToOne(() => Product, (product) => product.images, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'product_id' })
  product: Product
}

export { ProductImage }
