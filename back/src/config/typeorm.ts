// back\src\config\typeorm.ts

import { DataSource, DataSourceOptions } from 'typeorm';
import { config as dotenv } from 'dotenv';
import { registerAs } from '@nestjs/config';

dotenv({ path: '.env' });

console.info('dropSchema: ', process.env.DROPSCHEMA);
console.info('DB_TYPE: ', process.env.DB_TYPE);
console.info('DB_DATABASE: ', process.env.DB_DATABASE);

const typeOrmConfig = {
  type: process.env.DB_TYPE || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: (process.env.DB_PORT as unknown as number) || 5432,
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'admin',
  database: process.env.DB_DATABASE || 'postgres',
  synchronize: process.env.DROPSCHEMA === 'true',
  dropSchema: process.env.DROPSCHEMA === 'true',
  autoloadEntities: true,
  //logging: true,
  logging: ['error'],
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/migrations/*{.ts,.js}'],
};

export default registerAs('typeorm', () => typeOrmConfig);

// para la migracion
export const conectionSource = new DataSource(
  typeOrmConfig as DataSourceOptions,
);
