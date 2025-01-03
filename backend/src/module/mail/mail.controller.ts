import { Controller, Post, Body } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailDto } from './dtos/mail.dto';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post('send')
  async sendEmail(@Body() body: MailDto) {
    await this.mailService.sendMail(body);
    return { message: 'Corporate Email sent successfully' };
  }
}
