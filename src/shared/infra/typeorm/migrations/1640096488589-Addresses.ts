import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class Addresses1640096488589 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'addresses',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'identifier',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'zip',
            type: 'varchar',
          },
          {
            name: 'state',
            type: 'varchar',
          },
          {
            name: 'city',
            type: 'varchar',
          },
          {
            name: 'district',
            type: 'varchar',
          },
          {
            name: 'address',
            type: 'varchar',
          },
          {
            name: 'number',
            type: 'varchar',
          },
          {
            name: 'address_2',
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
            name: 'addressable_id',
            type: 'varchar',
          },
          {
            name: 'addressable_type',
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
            name: 'addresses_account_id_accounts',
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
    await queryRunner.dropTable('addresses')
  }
}
