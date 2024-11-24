"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.conectionSource = void 0;
const typeorm_1 = require("typeorm");
const dotenv_1 = require("dotenv");
const config_1 = require("@nestjs/config");
(0, dotenv_1.config)({ path: '.env' });
console.info('dropSchema: ', process.env.DROPSCHEMA);
console.info('DB_TYPE: ', process.env.DB_TYPE);
console.info('DB_DATABASE: ', process.env.DB_DATABASE);
const typeOrmConfig = {
    type: process.env.DB_TYPE || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'admin',
    database: process.env.DB_DATABASE || 'postgres',
    synchronize: process.env.DROPSCHEMA === 'true',
    dropSchema: process.env.DROPSCHEMA === 'true',
    autoloadEntities: true,
    logging: ['error'],
    entities: ['dist/**/*.entity{.ts,.js}'],
    migrations: ['dist/migrations/*{.ts,.js}'],
};
exports.default = (0, config_1.registerAs)('typeorm', () => typeOrmConfig);
exports.conectionSource = new typeorm_1.DataSource(typeOrmConfig);
//# sourceMappingURL=typeorm.js.map