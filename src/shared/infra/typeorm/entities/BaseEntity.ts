import {
  CreateDateColumn,
  Exclusion,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

abstract class BaseEntity {
  private use_timestamp = true;

  @PrimaryGeneratedColumn()
  id: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at?: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at?: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();

      if (this.use_timestamp) {
        this.created_at = this.updated_at = new Date();
      }
    }
  }
}

export { BaseEntity };
