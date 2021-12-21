import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class Profiles1640009740832 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'profiles',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'nickname',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'is_company',
            type: 'boolean',
            default: false,
          },
          {
            name: 'document_number',
            type: 'varchar(18)',
          },
          {
            name: 'state_subscription_number',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'city_subscription_number',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'is_main',
            type: 'boolean',
            default: false,
          },
          {
            name: 'account_id',
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
          {
            name: 'profiles_account_id_accounts',
            columnNames: ['account_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'accounts',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('profiles')
  }
}
