import { Account } from '@modules/accounts/infra/typeorm/entities/Account'
import { User } from '@modules/users/infra/typeorm/entities/User'
import { BaseEntity } from '@shared/infra/typeorm/entities/BaseEntity'
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'

@Entity('notifications')
class Notification extends BaseEntity {
  @Column()
  title?: string

  @Column()
  data: string

  @Column()
  account_id: string

  @Column()
  user_id?: string

  @ManyToOne(() => Account, (account) => account.notifications)
  @JoinColumn({ name: 'account_id' })
  account: Account

  @ManyToOne(() => User, (user) => user.notifications)
  @JoinColumn({ name: 'user_id' })
  user?: User

  @Column()
  type: 'normal' | 'success' | 'warning' | 'error' | 'info'

  @Column({ nullable: true, default: false })
  read_at: Date
}

export { Notification }
