import { DataSource } from 'typeorm';
export declare class BackupDBService {
    private readonly dataSource;
    constructor(dataSource: DataSource);
    private backupDir;
    backupPostgresDatabase(): Promise<{
        backupFile: string;
    }>;
    backupMySQLDatabase(): Promise<unknown>;
    getBackupFiles(): Promise<string[]>;
    getBackupFilePath(backupFile: string): string;
    deleteBackupFile(file: string): Promise<boolean>;
    restoreDatabaseFromBackup(backupfile: string): Promise<string>;
    restorePostgresDatabase(filePath: string): Promise<string>;
    restoreMySQLDatabase(filePath: string): Promise<string>;
}
