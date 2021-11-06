import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm'

export class AddIntegrationIdToProducts1636137709660
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'products',
      new TableColumn({
        name: 'integration_id',
        type: 'varchar',
      })
    )
    await queryRunner.createForeignKey(
      'products',
      new TableForeignKey({
        name: 'integration_id_products',
        columnNames: ['integration_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'integrations',
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('products', 'integration_id_products')
    await queryRunner.dropColumn('products', 'integration_id')
  }
}
