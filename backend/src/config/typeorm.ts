import { DataSource, DataSourceOptions } from 'typeorm';
import { config as dotenv } from 'dotenv';
import { registerAs } from '@nestjs/config';

dotenv({ path: '.env' });

// Verificar y mostrar valores críticos
console.info('dropSchema: ', process.env.DROPSCHEMA || 'false');
console.info('DB_TYPE: ', process.env.DB_TYPE || 'postgres');
console.info('DB_DATABASE: ', process.env.DB_DATABASE || 'defaultdb');

// Configuración de TypeORM
const typeOrmConfig: DataSourceOptions = {
  type: (process.env.DB_TYPE as any) || 'postgres', // TypeORM espera un tipo específico
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10), // Asegurarse de que sea un número
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'admin',
  database: process.env.DB_DATABASE || 'postgres',
  synchronize: process.env.DROPSCHEMA === 'true',
  dropSchema: process.env.DROPSCHEMA === 'true',
  logging: ['error'], // Solo errores, puedes habilitar más detalles para debug
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/migrations/*{.ts,.js}'],
  ssl:
    process.env.DB_SSL === 'true' // Configuración SSL opcional
      ? { rejectUnauthorized: false } // Solo para entornos no críticos
      : undefined,
};

// Registro para NestJS ConfigModule
export default registerAs('typeorm', () => typeOrmConfig);

// Configuración para migraciones (CLI de TypeORM)
export const conectionSource = new DataSource(
  typeOrmConfig as DataSourceOptions,
);
