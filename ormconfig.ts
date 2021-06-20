module.exports = {
  type: 'postgres',
  host: process.env['POSTGRES_HOST'],
  username: process.env['POSTGRES_USER'],
  password: process.env['POSTGRES_PASSWORD'],
  database: process.env['POSTGRES_DB'],
  port: process.env['POSTGRES_PORT'],
  entities: ['./dist/resources/*/*.entity.js'],
  migrations: ['./dist/resources/migrations/*.js'],
  cli: {
    migrationsDir: 'src/resources/migrations',
  },
};
