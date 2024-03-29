import { type } from 'os'
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm'
import { v4 as uuidV4 } from 'uuid'
import { User } from './User'

@Entity('user_tokens')
class UserToken {
  @PrimaryColumn()
  id: string

  @Column()
  token: string

  @Column()
  type: string

  @Column()
  user_id: string

  @ManyToOne(() => User, (user) => user.tokens, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: User

  @Column({
    type: 'timestamp',
  })
  expires_at: Date

  @CreateDateColumn({
    type: 'timestamp',
  })
  created_at: Date

  constructor() {
    if (!this.id) {
      this.id = uuidV4()
      this.created_at = new Date()
    }
  }
}

export { UserToken }
