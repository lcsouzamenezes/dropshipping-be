import { Account } from '@modules/accounts/infra/typeorm/entities/Account';
import { BaseEntity } from '@shared/infra/typeorm/entities/BaseEntity';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

@Entity('users')
class User extends BaseEntity {
  @Column()
  email: string;

  @Column()
  password: string;

  @Column({
    default: false,
  })
  active: boolean;

  @Column({
    default: false,
  })
  master: boolean;

  @Column({
    default: true,
  })
  admin: boolean;

  @OneToOne(() => Account, (account) => account.user)
  @JoinColumn({ referencedColumnName: 'id', name: 'account_id' })
  account: Account;
}

export { User };
