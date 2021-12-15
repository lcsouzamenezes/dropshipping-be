import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'

export class AddIntegrationProductCode1639424916038
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'products',
      new TableColumn({
        name: 'integration_product_code',
        type: 'varchar',
        isUnique: true,
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('products', 'integration_product_code')
  }
}
