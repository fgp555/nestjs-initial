import { Module } from '@nestjs/common';
import { BackupDBController } from './backup-db.controller';
import { BackupDBService } from './backup-db.service';

@Module({
  controllers: [BackupDBController],
  providers: [BackupDBService],
})
export class BackupDBModule {}
