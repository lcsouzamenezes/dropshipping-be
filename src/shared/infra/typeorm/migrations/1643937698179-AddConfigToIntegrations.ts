import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'

export class AddConfigToIntegrations1643937698179
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'integrations',
      new TableColumn({
        name: 'settings',
        type: 'TEXT',
        isNullable: true,
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('integrations', 'settings')
  }
}
