import { Account } from '@modules/accounts/infra/typeorm/entities/Account';
import { BaseEntity } from '@shared/infra/typeorm/entities/BaseEntity';
import { Exclude } from 'class-transformer';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

@Entity('users')
class User extends BaseEntity {
  @Column()
  email: string;

  @Exclude()
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

  @Column()
  account_id: string;

  @OneToOne(() => Account, (account) => account.user, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ referencedColumnName: 'id', name: 'account_id' })
  account: Account;
}

export { User };
