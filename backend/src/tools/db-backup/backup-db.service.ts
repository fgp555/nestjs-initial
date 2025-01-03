import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { exec } from 'child_process';
import { DataSource } from 'typeorm';

@Injectable()
export class BackupDBService {
  constructor(private readonly dataSource: DataSource) {}

  private backupDir = path.join(__dirname, '../../../backups');

  async backupPostgresDatabase() {
    const backupDir = this.backupDir;
    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir);
    }
    const backupFile = path.join(
      backupDir,
      `backup-pg-${new Date()
        .toISOString()
        .replace(/[:.\-Z]/g, '')
        .replace('T', '-')
        .slice(2, -3)}.sql`,
    );
    const command = `pg_dump -U ${process.env.DB_USERNAME} -h ${process.env.DB_HOST} -p ${process.env.DB_PORT} -F p -d ${process.env.DB_DATABASE} -f ${backupFile}`;
    new Promise((resolve, reject) => {
      exec(
        command,
        { env: { PGPASSWORD: process.env.DB_PASSWORD } },
        (error) => {
          if (error) {
            reject(`Error generating backup: ${error.message}`);
          } else {
            resolve(`Backup saved at: ${backupFile}`);
          }
        },
      );
    });
    return { backupFile: backupFile };
  }

  async backupMySQLDatabase() {
    const backupDir = this.backupDir;
    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir);
    }
    const backupFile = path.join(
      backupDir,
      `backup-mysql-${new Date()
        .toISOString()
        .replace(/[:.\-Z]/g, '')
        .replace('T', '-')
        .slice(2, -3)}.sql`,
    );
    const command = `mysqldump -u ${process.env.DB_USERNAME} -p${process.env.DB_PASSWORD} -h ${process.env.DB_HOST} ${process.env.DB_DATABASE} > ${backupFile}`;
    return new Promise((resolve, reject) => {
      exec(command, (error) => {
        if (error) {
          reject(`Error generating backup: ${error.message}`);
        } else {
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

  getBackupFilePath(backupFile: string) {
    const backupDir = this.backupDir;
    const filePath = path.join(backupDir, backupFile);
    if (!fs.existsSync(filePath)) {
      throw new Error(`Backup file ${backupFile} not found.`);
    }
    return filePath;
  }

  async deleteBackupFile(file: string): Promise<boolean> {
    const filePath = path.join(this.backupDir, file);
    if (!fs.existsSync(filePath)) {
      throw new Error(`File ${file} does not exist.`);
    }
    try {
      fs.unlinkSync(filePath);
      return true;
    } catch (error) {
      throw new Error(`Error deleting file ${file}: ${error.message}`);
    }
  }

  // Function to restore the database from a backup file
  async restoreDatabaseFromBackup(backupfile: string): Promise<string> {
    // const backupDir = path.join(__dirname, '../../backups');
    const backupDir = this.backupDir;

    const filePath = path.join(backupDir, backupfile);

    if (!fs.existsSync(filePath)) {
      throw new Error(`Backup file ${backupfile} not found.`);
    }

    const dbType = process.env.DB_TYPE || 'postgres';

    if (dbType === 'mysql') {
      return await this.restoreMySQLDatabase(filePath);
    } else if (dbType === 'postgres') {
      return await this.restorePostgresDatabase(filePath);
    } else {
      throw new Error('Unsupported database type');
    }
  }

  // Function to restore PostgreSQL database from a backup file
  async restorePostgresDatabase(filePath: string): Promise<string> {
    await this.dataSource.dropDatabase();

    // const command = `pg_restore -U ${process.env.DB_USERNAME} -h ${process.env.DB_HOST} -p ${process.env.DB_PORT} -d ${process.env.DB_DATABASE} -F c ${filePath}`;
    const command = `psql -U ${process.env.DB_USERNAME} -h ${process.env.DB_HOST} -p ${process.env.DB_PORT} -d ${process.env.DB_DATABASE} -f ${filePath}`;

    return new Promise((resolve, reject) => {
      exec(
        command,
        { env: { PGPASSWORD: process.env.DB_PASSWORD } },
        (error, stdout, stderr) => {
          if (error) {
            reject(`Error restoring backup: ${stderr}`);
          } else {
            resolve(`Database restored successfully from: ${filePath}`);
          }
        },
      );
    });
  }

  // Function to restore MySQL database from a backup file
  async restoreMySQLDatabase(filePath: string): Promise<string> {
    const command = `mysql -u ${process.env.DB_USERNAME} -p${process.env.DB_PASSWORD} -h ${process.env.DB_HOST} ${process.env.DB_DATABASE} < ${filePath}`;

    return new Promise((resolve, reject) => {
      exec(command, (error, stdout, stderr) => {
        if (error) {
          reject(`Error restoring backup: ${stderr}`);
        } else {
          resolve(`Database restored successfully from: ${filePath}`);
        }
      });
    });
  }

  private uploadDir = path.join(__dirname, '../../../uploads');
  // Method to process the uploaded SQL file (e.g., restore the database)
  async processUploadedSQLFile(filePath: string) {
    return new Promise((resolve, reject) => {
      const command = `psql -U ${process.env.DB_USERNAME} -h ${process.env.DB_HOST} -p ${process.env.DB_PORT} -d ${process.env.DB_DATABASE} -f ${filePath}`;

      exec(
        command,
        { env: { PGPASSWORD: process.env.DB_PASSWORD } },
        (error, stdout, stderr) => {
          if (error) {
            reject(`Error restoring database: ${stderr}`);
          } else {
            resolve(`Database restored successfully from: ${filePath}`);
          }
        },
      );
    });
  }
}
