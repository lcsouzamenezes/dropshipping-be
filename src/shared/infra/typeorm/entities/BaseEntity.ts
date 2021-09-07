import { CreateDateColumn, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

abstract class BaseEntity {
  @PrimaryColumn()
  id: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at?: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at?: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
      this.created_at = this.updated_at = new Date();
    }
  }
}

export { BaseEntity };
