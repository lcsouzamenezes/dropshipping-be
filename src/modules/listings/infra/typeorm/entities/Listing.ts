import { Account } from '@modules/accounts/infra/typeorm/entities/Account'
import { Integration } from '@modules/integrations/infra/typeorm/entities/Integration'
import { BaseEntity } from '@shared/infra/typeorm/entities/BaseEntity'
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'

@Entity('listings')
class Listing extends BaseEntity {
  @Column()
  code: string

  @ManyToOne(() => Integration, (integration) => integration.listings)
  @JoinColumn({ name: 'integration_id' })
  integration: Integration

  @JoinColumn({ name: 'account_id' })
  account?: Account

  @Column()
  account_id: string

  @Column()
  integration_id: string

  @Column()
  active: boolean
}

export { Listing }
