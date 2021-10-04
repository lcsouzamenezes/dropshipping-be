import { User } from '@modules/users/infra/typeorm/entities/User'
import { BaseEntity } from '@shared/infra/typeorm/entities/BaseEntity'
import { Column, Entity, OneToOne } from 'typeorm'
import { Exclude } from 'class-transformer'

@Entity('accounts')
class Account extends BaseEntity {
  @Column()
  name: string

  @Exclude()
  @Column({ default: true })
  active: boolean

  @Exclude()
  @Column({ default: 'client' })
  type: string

  @OneToOne(() => User, (user) => user.account)
  user: User
}

export { Account }
