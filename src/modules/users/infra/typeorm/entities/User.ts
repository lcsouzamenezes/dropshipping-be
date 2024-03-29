import { Account } from '@modules/accounts/infra/typeorm/entities/Account'
import { BaseEntity } from '@shared/infra/typeorm/entities/BaseEntity'
import { Exclude } from 'class-transformer'
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm'
import { UserToken } from './UserToken'
import { Notification } from '@modules/notifications/infra/typeorm/entities/Notification'

@Entity('users')
class User extends BaseEntity {
  @Column()
  name: string

  @Column()
  email: string

  @Exclude()
  @Column()
  password: string

  @Exclude()
  @Column({
    default: false,
  })
  active: boolean

  @Exclude()
  @Column({
    default: false,
  })
  master: boolean

  @OneToMany(() => Notification, (notification) => notification.user)
  notifications: Notification[]

  @Column()
  account_id: string

  @OneToOne(() => Account, (account) => account.user, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'account_id' })
  account: Account

  tokens: UserToken[]
}

export { User }
