import { User } from '@modules/users/infra/typeorm/entities/User'
import { BaseEntity } from '@shared/infra/typeorm/entities/BaseEntity'
import { Column, Entity, OneToMany, OneToOne } from 'typeorm'
import { Exclude } from 'class-transformer'
import { Integration } from '@modules/integrations/infra/typeorm/entities/Integration'

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

  @OneToMany(() => Integration, (integration) => integration.account)
  integrations: Integration[]
}

export { Account }
