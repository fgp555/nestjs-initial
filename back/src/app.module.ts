import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './module/user/user.module';
import { InfoModule } from './info/info.module';
import { DbModule } from './config/db.module';

@Module({
  imports: [DbModule, InfoModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
