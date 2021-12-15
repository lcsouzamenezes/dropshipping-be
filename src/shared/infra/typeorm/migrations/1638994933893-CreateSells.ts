import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateSales1638994933893 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'sales',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'integration_order_id',
            type: 'varchar',
          },
          {
            name: 'listing_id',
            type: 'varchar',
          },
          {
            name: 'quantity',
            type: 'integer',
            default: '1',
          },
          {
            name: 'account_id',
            type: 'varchar',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'NOW()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'NOW()',
          },
        ],
        uniques: [
          {
            columnNames: ['integration_order_id', 'listing_id'],
            name: 'integration_listing_id_unique',
          },
        ],
        foreignKeys: [
          {
            name: 'listing_id_listings',
            columnNames: ['listing_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'listings',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          {
            name: 'account_id_accounts',
            columnNames: ['account_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'accounts',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('sales')
  }
}
