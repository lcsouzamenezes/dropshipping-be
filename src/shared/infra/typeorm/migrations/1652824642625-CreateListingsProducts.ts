import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateListingsProducts1652824642625 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'listings_products',
        columns: [
          {
            name: 'product_id',
            type: 'varchar',
          },
          {
            name: 'listing_id',
            type: 'varchar',
          },
        ],
        foreignKeys: [
          {
            name: 'listing_id_listings_id',
            columnNames: ['listing_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'listings',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          {
            name: 'product_id_products_id',
            columnNames: ['product_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'products',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('listings_products')
  }
}
