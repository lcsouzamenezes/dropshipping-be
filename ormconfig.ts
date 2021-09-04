export default {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'dropshipping',
  password: 'dropshipping',
  database: 'dropshipping_db',
  synchronize: true,
  logging: false,
  entities: ['src/entity/**/*.ts'],
  migrations: ['src/migration/**/*.ts'],
  subscribers: ['src/subscriber/**/*.ts'],
  cli: {
    entitiesDir: '<entities directory>',
    migrationsDir: '<migrations directory>',
  },
};
