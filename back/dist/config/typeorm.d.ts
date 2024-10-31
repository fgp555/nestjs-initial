import { DataSource } from 'typeorm';
declare const _default: (() => {
    type: string;
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
    autoloadEntities: boolean;
    logging: string[];
    entities: string[];
    migrations: string[];
    synchronize: boolean;
}) & import("@nestjs/config").ConfigFactoryKeyHost<{
    type: string;
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
    autoloadEntities: boolean;
    logging: string[];
    entities: string[];
    migrations: string[];
    synchronize: boolean;
}>;
export default _default;
export declare const conectionSource: DataSource;
