import { query } from 'express'
import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableIndex,
} from 'typeorm'

export class ProductsAddEAN1635529653845 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'products',
      new TableColumn({
        name: 'ean',
        type: 'varchar(20)',
        isNullable: true,
      })
    )
    await queryRunner.createIndex(
      'products',
      new TableIndex({
        name: 'products_ean',
        columnNames: ['ean'],
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropIndex('products', 'products_ean')
    await queryRunner.dropColumn('products', 'ean')
  }
}
