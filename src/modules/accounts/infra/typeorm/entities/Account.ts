import { User } from '@modules/users/infra/typeorm/entities/User';
import { BaseEntity } from '@shared/infra/typeorm/entities/BaseEntity';
import { Column, Entity, OneToOne } from 'typeorm';

@Entity('accounts')
class Account extends BaseEntity {
  @Column()
  name: string;

  @Column({ default: true })
  active: boolean;

  @Column({ default: 'client' })
  type: string;

  @OneToOne(() => User, (user) => user.account)
  user: User;
}

export { Account };
