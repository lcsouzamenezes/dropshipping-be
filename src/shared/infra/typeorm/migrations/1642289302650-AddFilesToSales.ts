import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'

export class AddFilesToSales1642289302650 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('sales', [
      new TableColumn({
        name: 'receipt',
        type: 'varchar',
        isNullable: true,
      }),
      new TableColumn({
        name: 'invoice',
        type: 'varchar',
        isNullable: true,
      }),
      new TableColumn({
        name: 'label',
        type: 'varchar',
        isNullable: true,
      }),
    ])
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns('sales', ['receipt', 'invoice', 'label'])
  }
}
