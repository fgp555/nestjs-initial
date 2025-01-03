import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './module/user/user.module';
import { DbConfigModule } from './config/db.module';
import { InfoModule } from './tools/info/info.module';
import { DbBackupModule } from './tools/db-backup/backup-db.module';
import { AuthModule } from './module/auth/auth.module';

@Module({
  imports: [
    DbConfigModule,
    InfoModule,
    DbBackupModule,
    UserModule,
    AuthModule,
    //
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
