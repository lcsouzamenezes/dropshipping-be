import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'

export class AddOrderToProductImages1645918704854
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'product_images',
      new TableColumn({
        name: 'order',
        type: 'integer',
        isNullable: null,
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('product_images', 'order')
  }
}
