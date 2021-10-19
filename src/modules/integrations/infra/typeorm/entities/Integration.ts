import { Account } from '@modules/accounts/infra/typeorm/entities/Account'
import { BaseEntity } from '@shared/infra/typeorm/entities/BaseEntity'
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'

@Entity('integrations')
class Integration extends BaseEntity {
  @Column()
  account_id: string

  @Column()
  description: string

  @Column()
  provider: string

  @Column()
  access_token: string

  @Column({ nullable: true })
  refresh_token: string

  @Column({ nullable: true })
  user_id: string

  @Column({ type: 'timestamp', nullable: true })
  expires_at: Date

  @ManyToOne(() => Account, (account) => account.integrations, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'account_id' })
  account: Account
}

export { Integration }
