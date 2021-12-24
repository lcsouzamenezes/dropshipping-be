import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'

export class CreateActiveColumnInProducts1640355186220
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'products',
      new TableColumn({
        name: 'active',
        type: 'boolean',
        default: true,
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('products', 'active')
  }
}
