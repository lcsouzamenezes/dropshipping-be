import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'

export class AddStatusToSales1643544043217 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'sales',
      new TableColumn({
        name: 'status',
        type: 'varchar',
        default: '"pending"',
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('sales', 'status')
  }
}
