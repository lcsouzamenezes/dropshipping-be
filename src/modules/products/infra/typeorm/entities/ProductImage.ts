import { BaseEntity } from '@shared/infra/typeorm/entities/BaseEntity'
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'
import { Product } from './Product'

@Entity('product_images')
class ProductImage extends BaseEntity {
  @Column()
  url: string

  @Column({
    default: true,
  })
  is_external: boolean

  @Column()
  product_id: string

  @ManyToOne(() => Product, (product) => product.images, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'product_id' })
  product: Product

  @Column()
  order: number
}

export { ProductImage }
