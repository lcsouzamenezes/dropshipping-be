import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm'

export class CreateListings1638823109499 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'listings',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'code',
            type: 'varchar',
          },
          {
            name: 'integration_id',
            type: 'varchar',
          },
          {
            name: 'active',
            type: 'boolean',
            default: true,
          },
          {
            name: 'account_id',
            type: 'varchar',
          },
          {
            name: 'product_id',
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
        foreignKeys: [
          new TableForeignKey({
            name: 'integration_id_listings',
            columnNames: ['integration_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'integrations',
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
          }),
          new TableForeignKey({
            name: 'account_id_listings',
            columnNames: ['account_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'accounts',
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
          }),
          new TableForeignKey({
            name: 'product_id_listings',
            columnNames: ['product_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'products',
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
          }),
        ],
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('listings')
  }
}
