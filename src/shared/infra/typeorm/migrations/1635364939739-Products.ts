import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class Products1635364939739 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'products',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'account_id',
            type: 'varchar',
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'sku',
            type: 'varchar',
          },
          {
            name: 'price',
            type: 'integer',
            default: 0,
          },
          {
            name: 'stock',
            type: 'decimal(10,2)',
            default: 0,
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
            onUpdate: 'NOW()',
          },
        ],
        foreignKeys: [
          {
            columnNames: ['account_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'accounts',
            name: 'products_account_id',
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
          },
        ],
        uniques: [
          {
            name: 'sku_account_id_unique',
            columnNames: ['sku', 'account_id'],
          },
        ],
        indices: [
          {
            name: 'products_sku',
            columnNames: ['sku'],
          },
        ],
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('products')
  }
}
