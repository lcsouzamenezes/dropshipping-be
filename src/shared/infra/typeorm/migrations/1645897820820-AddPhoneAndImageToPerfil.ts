import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'

export class AddPhoneAndImageToPerfil1645897820820
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('profiles', [
      new TableColumn({
        name: 'mobile_number',
        type: 'varchar',
        isNullable: true,
      }),
      new TableColumn({
        name: 'image',
        type: 'varchar',
        isNullable: true,
      }),
    ])
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns('profiles', ['mobile_number', 'image'])
  }
}
