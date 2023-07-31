import { DataSource, DataSourceOptions } from 'typeorm'

export const dataSourceOptions: DataSourceOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  // username: process.env.DB_USERNAME, // 'root'
  // password: process.env.DB_PASSWORD, // 'root'
  // database:  process.env.DB_NAME, // 
   username: 'root', // 'root'
  password: 'root', // 'root'
  database:  'diplom', // 
  entities: [
    `dist/src/entities/*.entity{.ts,.js}`
  ], 
  migrations: [
    'dist/db/migrations/*.js'
  ],
  // logging: true,
  // migrationsRun: true,
  synchronize: true
}

const dataSource = new DataSource(dataSourceOptions);
export default dataSource