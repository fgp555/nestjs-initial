import { Response } from 'express';
import { BackupDBService } from './backup-db.service';
export declare class BackupDBController {
    private readonly backupService;
    constructor(backupService: BackupDBService);
    createBackup(): Promise<{
        dbType: string;
        message: string;
        error?: undefined;
    } | {
        error: any;
        dbType?: undefined;
        message?: undefined;
    }>;
    backupPostgresDatabase(): Promise<{
        message: {
            backupFile: string;
        };
        error?: undefined;
    } | {
        error: any;
        message?: undefined;
    }>;
    backupMySQLDatabase(): Promise<{
        message: unknown;
        error?: undefined;
    } | {
        error: any;
        message?: undefined;
    }>;
    displayBackupFiles(): Promise<{
        files: string[];
        error?: undefined;
    } | {
        error: any;
        files?: undefined;
    }>;
    downloadBackupFile(backupfile: string, res: Response): Promise<void>;
    deleteBackupFile(file: string, res: Response): Promise<Response<any, Record<string, any>>>;
    restoreFileBackup(backupfile: string, res: Response): Promise<Response<any, Record<string, any>>>;
}
