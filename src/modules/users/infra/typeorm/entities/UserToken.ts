import { Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';
import { User } from './User';

@Entity('user_tokens')
class UserToken {
  @PrimaryColumn()
  id: string;

  token: string;

  type: string;

  user_id: string;

  @ManyToOne(() => User, (user) => user.tokens)
  user: User;

  expires_at: Date;

  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { UserToken };
