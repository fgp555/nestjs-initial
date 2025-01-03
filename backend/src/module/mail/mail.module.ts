import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailController } from './mail.controller';
import { MailTemplatesService } from './mail-template.service';
import { MailTemplatesController } from './mail-template.controller';
import { MailTemplate } from './entities/mail-template.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailSeederService } from './seed/mail.seeder';

@Module({
  imports: [TypeOrmModule.forFeature([MailTemplate])],
  controllers: [MailController, MailTemplatesController],
  providers: [
    MailService,
    MailTemplatesService,
    MailSeederService,
    //
  ],
  exports: [MailService, MailTemplatesService, TypeOrmModule],
})
export class MailModule {}
