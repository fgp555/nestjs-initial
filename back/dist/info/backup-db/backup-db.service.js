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
exports.BackupDBService = void 0;
const common_1 = require("@nestjs/common");
const fs = require("fs");
const path = require("path");
const child_process_1 = require("child_process");
const typeorm_1 = require("typeorm");
let BackupDBService = class BackupDBService {
    constructor(dataSource) {
        this.dataSource = dataSource;
        this.backupDir = path.join(__dirname, '../../../backups');
    }
    async backupPostgresDatabase() {
        const backupDir = this.backupDir;
        if (!fs.existsSync(backupDir)) {
            fs.mkdirSync(backupDir);
        }
        const backupFile = path.join(backupDir, `backup-pg-${new Date()
            .toISOString()
            .replace(/[:.\-Z]/g, '')
            .replace('T', '-')
            .slice(2, -3)}.sql`);
        const command = `pg_dump -U ${process.env.DB_USERNAME} -h ${process.env.DB_HOST} -p ${process.env.DB_PORT} -F p -d ${process.env.DB_DATABASE} -f ${backupFile}`;
        new Promise((resolve, reject) => {
            (0, child_process_1.exec)(command, { env: { PGPASSWORD: process.env.DB_PASSWORD } }, (error) => {
                if (error) {
                    reject(`Error generating backup: ${error.message}`);
                }
                else {
                    resolve(`Backup saved at: ${backupFile}`);
                }
            });
        });
        return { backupFile: backupFile };
    }
    async backupMySQLDatabase() {
        const backupDir = this.backupDir;
        if (!fs.existsSync(backupDir)) {
            fs.mkdirSync(backupDir);
        }
        const backupFile = path.join(backupDir, `backup-mysql-${new Date()
            .toISOString()
            .replace(/[:.\-Z]/g, '')
            .replace('T', '-')
            .slice(2, -3)}.sql`);
        const command = `mysqldump -u ${process.env.DB_USERNAME} -p${process.env.DB_PASSWORD} -h ${process.env.DB_HOST} ${process.env.DB_DATABASE} > ${backupFile}`;
        return new Promise((resolve, reject) => {
            (0, child_process_1.exec)(command, (error) => {
                if (error) {
                    reject(`Error generating backup: ${error.message}`);
                }
                else {
                    resolve({ backupFile });
                }
            });
        });
    }
    async getBackupFiles() {
        const backupDir = this.backupDir;
        if (!fs.existsSync(backupDir)) {
            throw new Error('Backup directory does not exist.');
        }
        const files = fs.readdirSync(backupDir);
        return files.filter((file) => file.endsWith('.sql'));
    }
    getBackupFilePath(backupFile) {
        const backupDir = this.backupDir;
        const filePath = path.join(backupDir, backupFile);
        if (!fs.existsSync(filePath)) {
            throw new Error(`Backup file ${backupFile} not found.`);
        }
        return filePath;
    }
    async deleteBackupFile(file) {
        const filePath = path.join(this.backupDir, file);
        if (!fs.existsSync(filePath)) {
            throw new Error(`File ${file} does not exist.`);
        }
        try {
            fs.unlinkSync(filePath);
            return true;
        }
        catch (error) {
            throw new Error(`Error deleting file ${file}: ${error.message}`);
        }
    }
    async restoreDatabaseFromBackup(backupfile) {
        const backupDir = this.backupDir;
        const filePath = path.join(backupDir, backupfile);
        if (!fs.existsSync(filePath)) {
            throw new Error(`Backup file ${backupfile} not found.`);
        }
        const dbType = process.env.DB_TYPE || 'postgres';
        if (dbType === 'mysql') {
            return await this.restoreMySQLDatabase(filePath);
        }
        else if (dbType === 'postgres') {
            return await this.restorePostgresDatabase(filePath);
        }
        else {
            throw new Error('Unsupported database type');
        }
    }
    async restorePostgresDatabase(filePath) {
        await this.dataSource.dropDatabase();
        const command = `psql -U ${process.env.DB_USERNAME} -h ${process.env.DB_HOST} -p ${process.env.DB_PORT} -d ${process.env.DB_DATABASE} -f ${filePath}`;
        return new Promise((resolve, reject) => {
            (0, child_process_1.exec)(command, { env: { PGPASSWORD: process.env.DB_PASSWORD } }, (error, stdout, stderr) => {
                if (error) {
                    reject(`Error restoring backup: ${stderr}`);
                }
                else {
                    resolve(`Database restored successfully from: ${filePath}`);
                }
            });
        });
    }
    async restoreMySQLDatabase(filePath) {
        const command = `mysql -u ${process.env.DB_USERNAME} -p${process.env.DB_PASSWORD} -h ${process.env.DB_HOST} ${process.env.DB_DATABASE} < ${filePath}`;
        return new Promise((resolve, reject) => {
            (0, child_process_1.exec)(command, (error, stdout, stderr) => {
                if (error) {
                    reject(`Error restoring backup: ${stderr}`);
                }
                else {
                    resolve(`Database restored successfully from: ${filePath}`);
                }
            });
        });
    }
};
exports.BackupDBService = BackupDBService;
exports.BackupDBService = BackupDBService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], BackupDBService);
//# sourceMappingURL=backup-db.service.js.map