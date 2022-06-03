import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm'

export class RemoveProductFromListings1652828203296
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('listings', 'product_id_listings')
    await queryRunner.dropColumn('listings', 'product_id')
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'listings',
      new TableColumn({
        name: 'product_id',
        type: 'varchar',
        isNullable: true,
      })
    )
    await queryRunner.createForeignKey(
      'listings',
      new TableForeignKey({
        name: 'product_id_listings',
        columnNames: ['product_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'products',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      })
    )
  }
}
