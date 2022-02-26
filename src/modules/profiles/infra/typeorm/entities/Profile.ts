import { Account } from '@modules/accounts/infra/typeorm/entities/Account'
import { Address } from '@modules/addresses/infra/typeorm/entities/Address'
import { BaseEntity } from '@shared/infra/typeorm/entities/BaseEntity'
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm'

@Entity('profiles')
export class Profile extends BaseEntity {
  @Column()
  name: string

  @Column({
    nullable: true,
  })
  nickname?: string

  @Column({
    type: 'boolean',
    default: false,
  })
  is_company: boolean

  @Column()
  document_number: number

  @Column({
    nullable: true,
  })
  state_subscription_number?: number

  @Column({
    nullable: true,
  })
  city_subscription_number?: number

  @Column({
    type: 'boolean',
    default: false,
  })
  is_main: boolean

  @Column()
  account_id: string

  @OneToMany(() => Address, (address) => address.profile)
  address: Address

  @OneToOne(() => Account, (account) => account.profile)
  @JoinColumn({ name: 'account_id' })
  account: Account

  @Column()
  mobile_number: number

  @Column()
  image: string
}
