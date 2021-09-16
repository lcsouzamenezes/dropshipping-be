import { MigrationInterface, QueryRunner } from 'typeorm';
import { hash } from 'bcryptjs';

export class SeedUsers1631726033950 implements MigrationInterface {
  private account_id: string = '5d6a5bf3-38fd-42bb-aa94-05e5670d2b1c';
  private user_id: string = '2dcab525-727c-4245-8904-33eff10351f3';

  public async up(queryRunner: QueryRunner): Promise<void> {
    const password = await hash('Clubgroup69*', 8);

    await queryRunner.query(`
      INSERT INTO accounts (id, name, active, type) VALUES ('${this.account_id}', 'Bertoldi Tecnologia', '1', 'seller')
    `);

    await queryRunner.query(
      `INSERT INTO users (id, email, password, active, master, account_id) VALUES ('${this.user_id}', 'jonathan@lojasbertoldi.com.br', '${password}', '1', '1', '${this.account_id}')`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM users WHERE id='${this.user_id}'`);
    await queryRunner.query(
      `DELETE FROM accounts WHERE id='${this.account_id}'`
    );
  }
}
