module.exports = [
  {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'dropshipping',
    password: 'dropshipping',
    database: 'dropshipping_db',
    synchronize: false,
    logging: false,
    migrations: ['./src/shared/infra/typeorm/migrations/*.ts'],
    entities: ['./src/modules/**/infra/typeorm/entities/*.ts'],
    cli: {
      migrationsDir: './src/shared/infra/typeorm/migrations',
    },
  },
  {
    name: 'seed',
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'dropshipping',
    password: 'dropshipping',
    database: 'dropshipping_db',
    synchronize: false,
    logging: false,
    migrations: ['./src/shared/infra/typeorm/seeders/*.ts'],
    entities: ['./src/modules/**/infra/typeorm/entities/*.ts'],
    cli: {
      migrationsDir: './src/shared/infra/typeorm/seeders',
    },
  },
]
