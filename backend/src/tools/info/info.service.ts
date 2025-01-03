import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource } from 'typeorm';
import * as os from 'os';
import * as fs from 'fs';
import * as path from 'path';
import { HttpAdapterHost } from '@nestjs/core';
import { conectionSource } from 'src/config/typeorm';
import { exec } from 'child_process';

@Injectable()
export class InfoService {
  constructor(
    private readonly dataSource: DataSource,
    private readonly httpAdapterHost: HttpAdapterHost,
  ) {}

  getSystemInfo() {
    return {
      nodeVersion: process.version,
      platform: process.platform,
      arch: process.arch,
      memoryUsage: process.memoryUsage(),
      uptime: process.uptime(),
      environmentVariables: { ...process.env, DB_PASSWORD: '********' },
      cpuInfo: os.cpus(),
      networkInterfaces: os.networkInterfaces(),
      osType: os.type(),
      osRelease: os.release(),
      osTotalMemory: os.totalmem(),
      osFreeMemory: os.freemem(),
    };
  }

  async getServerAndDatabaseTime() {
    // Hora del backend
    const serverTime = new Date();

    // Consulta para obtener la hora de la base de datos
    const result = await this.dataSource.query('SELECT NOW() AS dbTime');
    const databaseTime = result[0]?.dbTime;

    return {
      serverTime,
      databaseTime,
    };
  }

  async dropDatabase() {
    // Eliminar el esquema
    await this.dataSource.dropDatabase();
    console.log('Database schema dropped successfully');

    return 'dropDatabase successfully';
  }

  async resetDatabase() {
    // Eliminar el esquema
    await this.dataSource.dropDatabase();
    console.log('Database schema dropped successfully');

    // Sincronizar el esquema (o ejecutar migraciones)
    await this.dataSource.synchronize();
    // await this.dataSource.runMigrations(); // Usar si tienes migraciones
    console.log('Database schema synchronized successfully');

    return 'Database reset successfully';
  }

  getDatabaseInfo() {
    const dbConfig = this.dataSource.options;
    const withoutPassword = {
      ...dbConfig,
      password: '********',
    };
    return withoutPassword;
  }

  getEntitiesInfo() {
    return this.dataSource.entityMetadatas.map((entity) => ({
      entityName: entity.name,
      tableName: entity.tableName,
      columns: entity.columns.map((column) => ({
        columnName: column.propertyName,
        type: column.type,
        isPrimary: column.isPrimary,
        isNullable: column.isNullable,
      })),
      relations: entity.relations.map((relation) => ({
        relationProperty: relation.propertyName,
        type: relation.relationType,
        targetEntity: relation.inverseEntityMetadata.name,
      })),
    }));
  }

  getPackageInfo() {
    const packagePath = path.resolve(__dirname, '../../package.json');
    const packageJson = fs.readFileSync(packagePath, 'utf8');
    return JSON.parse(packageJson);
  }

  listAllEndpoints() {
    const server = this.httpAdapterHost.httpAdapter.getInstance();
    const router = server._router;
    const endpoints = [];

    let id = 1;

    router.stack.forEach((layer) => {
      if (layer.route) {
        const path = layer.route.path;
        const methods = Object.keys(layer.route.methods)
          .join(', ')
          .toUpperCase();
        endpoints.push({ id: id++, path, methods });
      }
    });

    return endpoints;
  }

  listAllEndpointsSorted() {
    const server = this.httpAdapterHost.httpAdapter.getInstance();
    const router = server._router;
    const endpoints = [];

    router.stack.forEach((layer) => {
      if (layer.route) {
        const path = layer.route.path;
        const methods = Object.keys(layer.route.methods)
          .map((method) => method.toUpperCase())
          .join(', ');
        endpoints.push({ path, methods });
      }
    });

    // Ordenar los endpoints de acuerdo con el orden de métodos: GET, POST, PATCH, DELETE
    const methodOrder = ['GET', 'POST', 'PATCH', 'DELETE'];
    endpoints.sort((a, b) => {
      const methodA = methodOrder.indexOf(a.methods.split(', ')[0]) ?? 4;
      const methodB = methodOrder.indexOf(b.methods.split(', ')[0]) ?? 4;
      return methodA - methodB;
    });

    let id = 1;
    const sortedEndpoints = endpoints.map((endpoint) => {
      return {
        id: id++,
        path: endpoint.path,
        methods: endpoint.methods,
      };
    });

    return sortedEndpoints;
  }

  async runMigrations() {
    const dataSource = await conectionSource.initialize();
    try {
      const result = await dataSource.runMigrations();
      return {
        message: 'Migraciones ejecutadas con éxito',
        details: result,
      };
    } catch (error) {
      throw new Error(`Error ejecutando migraciones: ${error.message}`);
    } finally {
      await dataSource.destroy();
    }
  }

  // Method to read and return the .env file contents
  async readEnvFile(): Promise<string> {
    const envFilePath = path.join(__dirname, '../../', '.env');

    try {
      // Read the content of the .env file
      const envFileContent = await fs.promises.readFile(envFilePath, 'utf8');
      if (!envFileContent) {
        throw new NotFoundException('.env file not found');
      }
      return envFileContent;
    } catch (error) {
      throw new NotFoundException('Error reading .env file: ' + error.message);
    }
  }
}
