import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { MailTemplatesService } from './mail-template.service';

@Controller('mail-templates')
export class MailTemplatesController {
  constructor(private readonly emailTemplatesService: MailTemplatesService) {}

  @Post()
  async createTemplate(@Body() data: any) {
    return await this.emailTemplatesService.createTemplate(data);
  }

  @Post('/sentMailTemplate')
  async sentMailTemplate(@Body() data: any) {
    return await this.emailTemplatesService.sentMailRegister(data);
  }

  @Get()
  async getTemplates() {
    return await this.emailTemplatesService.getTemplates();
  }

  @Get(':id')
  async getTemplateById(@Param('id') id: number) {
    return await this.emailTemplatesService.getTemplateById(id);
  }

  @Put(':id')
  async updateTemplate(@Param('id') id: number, @Body() data: any) {
    return await this.emailTemplatesService.updateTemplate(id, data);
  }

  @Delete(':id')
  async deleteTemplate(@Param('id') id: number) {
    await this.emailTemplatesService.deleteTemplate(id);
  }


}
