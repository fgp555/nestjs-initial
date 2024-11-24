"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InfoService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const os = require("os");
const fs = require("fs");
const path = require("path");
const core_1 = require("@nestjs/core");
const typeorm_2 = require("../config/typeorm");
let InfoService = class InfoService {
    constructor(dataSource, httpAdapterHost) {
        this.dataSource = dataSource;
        this.httpAdapterHost = httpAdapterHost;
    }
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
        const serverTime = new Date();
        const result = await this.dataSource.query('SELECT NOW() AS dbTime');
        const databaseTime = result[0]?.dbTime;
        return {
            serverTime,
            databaseTime,
        };
    }
    async dropDatabase() {
        await this.dataSource.dropDatabase();
        console.log('Database schema dropped successfully');
        return 'dropDatabase successfully';
    }
    async resetDatabase() {
        await this.dataSource.dropDatabase();
        console.log('Database schema dropped successfully');
        await this.dataSource.synchronize();
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
        const dataSource = await typeorm_2.conectionSource.initialize();
        try {
            const result = await dataSource.runMigrations();
            return {
                message: 'Migraciones ejecutadas con éxito',
                details: result,
            };
        }
        catch (error) {
            throw new Error(`Error ejecutando migraciones: ${error.message}`);
        }
        finally {
            await dataSource.destroy();
        }
    }
    async readEnvFile() {
        const envFilePath = path.join(__dirname, '../../', '.env');
        try {
            const envFileContent = await fs.promises.readFile(envFilePath, 'utf8');
            if (!envFileContent) {
                throw new common_1.NotFoundException('.env file not found');
            }
            return envFileContent;
        }
        catch (error) {
            throw new common_1.NotFoundException('Error reading .env file: ' + error.message);
        }
    }
};
exports.InfoService = InfoService;
exports.InfoService = InfoService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource,
        core_1.HttpAdapterHost])
], InfoService);
//# sourceMappingURL=info.service.js.map