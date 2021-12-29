import { TableColumn, MigrationInterface, QueryRunner } from 'typeorm'

export class CreateParendCodeInListings1640751861879
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'listings',
      new TableColumn({
        name: 'parent_code',
        type: 'varchar',
        isNullable: true,
        default: 'NULL',
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('listings', 'parent_code')
  }
}
