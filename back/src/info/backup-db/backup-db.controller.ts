import { Controller, Delete, Get, Param, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import * as fs from 'fs';
import * as path from 'path';
import { BackupDBService } from './backup-db.service';

@Controller('database')
export class BackupDBController {
  constructor(private readonly backupService: BackupDBService) {}

  @Get('backup')
  async createBackup() {
    const dbType = process.env.DB_TYPE || 'postgres';
    try {
      let result: any;
      if (dbType === 'mysql') {
        result = await this.backupService.backupMySQLDatabase();
      } else if (dbType === 'postgres') {
        result = await this.backupService.backupPostgresDatabase();
      } else {
        throw new Error('Unsupported database type');
      }
      const fileName = path.basename(result.backupFile);
      return { dbType, message: `${fileName}` };
    } catch (error) {
      return { error: error.message };
    }
  }

  @Get('/backup/postgres')
  async backupPostgresDatabase() {
    try {
      const result = await this.backupService.backupPostgresDatabase();
      return { message: result };
    } catch (error) {
      return { error: error.message };
    }
  }

  @Get('/backup/mysql')
  async backupMySQLDatabase() {
    try {
      const result = await this.backupService.backupMySQLDatabase();
      return { message: result };
    } catch (error) {
      return { error: error.message };
    }
  }

  @Get('display-backups-files')
  async displayBackupFiles() {
    try {
      const files = await this.backupService.getBackupFiles();
      return { files };
    } catch (error) {
      return { error: error.message };
    }
  }

  @Get('download-backup/:backupfile')
  async downloadBackupFile(
    @Param('backupfile') backupfile: string,
    @Res() res: Response,
  ) {
    try {
      const filePath = this.backupService.getBackupFilePath(backupfile);
      res.download(filePath, (err) => {
        if (err) {
          res.status(500).send({ error: 'Error downloading file' });
        }
      });
    } catch (error) {
      res.status(404).send({ error: error.message });
    }
  }

  @Delete('delete/:file')
  async deleteBackupFile(@Param('file') file: string, @Res() res: Response) {
    try {
      const result = await this.backupService.deleteBackupFile(file);
      return res
        .status(200)
        .json({ message: `File ${file} deleted successfully`, result });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  // Endpoint to restore database from a backup file
  @Post('restore-file-backup/:backupfile')
  async restoreFileBackup(
    @Param('backupfile') backupfile: string,
    @Res() res: Response,
  ) {
    try {
      const result =
        await this.backupService.restoreDatabaseFromBackup(backupfile);
      return res.json({ message: 'Database restored successfully', result });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}
