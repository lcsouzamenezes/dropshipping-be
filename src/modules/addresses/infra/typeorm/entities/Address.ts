import { Account } from '@modules/accounts/infra/typeorm/entities/Account'
import { Profile } from '@modules/profiles/infra/typeorm/entities/Profile'
import { User } from '@modules/users/infra/typeorm/entities/User'
import { BaseEntity } from '@shared/infra/typeorm/entities/BaseEntity'
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'

export type Addressable =
  | {
      addressable_type: 'profiles'
      addressable: Profile
    }
  | {
      addressable_type: 'users'
      addressable: User
    }

@Entity('addresses')
export class Address extends BaseEntity {
  @Column()
  identifier: string

  @Column()
  zip: number

  @Column()
  state: string

  @Column()
  city: string

  @Column()
  district: string

  @Column()
  address: string

  @Column()
  number: string

  @Column()
  address_2: string

  @Column({ default: false })
  is_main: boolean

  @Column()
  account_id: string

  @ManyToOne(() => Account, (account) => account.addresses)
  @JoinColumn({ name: 'account_id' })
  account?: Account

  @Column()
  addressable_id: string

  @Column()
  addressable_type: string

  addressable?: Addressable['addressable']
}
