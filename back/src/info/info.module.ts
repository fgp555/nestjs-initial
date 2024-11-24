import { Module } from '@nestjs/common';
import { InfoService } from './info.service';
import { InfoController } from './info.controller';
import { BackupDBModule } from './backup-db/backup-db.module';

@Module({
  imports: [BackupDBModule],
  controllers: [InfoController],
  providers: [InfoService],
})
export class InfoModule {}
