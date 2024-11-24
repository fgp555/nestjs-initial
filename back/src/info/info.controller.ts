import {
  Controller,
  Get,
  Delete,
  UnauthorizedException,
  Post,
  Body,
  UseGuards,
} from '@nestjs/common';
import { InfoService } from './info.service';
import { Request } from 'express';
import { Req } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { InfoGuard } from './guard/info.guard';

@Controller('info')
// @UseGuards(InfoGuard)
export class InfoController {
  constructor(private readonly infoService: InfoService) {}

  @Get()
  getSystemInfo() {
    return this.infoService.getSystemInfo();
  }

  @Get('system')
  listAllEndpointsSorted() {
    return this.infoService.listAllEndpointsSorted();
  }

  @Get('time')
  async getServerAndDatabaseTime() {
    return await this.infoService.getServerAndDatabaseTime();
  }

  @Get('infoDatabase')
  getDatabaseInfo() {
    return this.infoService.getDatabaseInfo();
  }

  @Delete('resetDatabase')
  resetDatabase(@Req() request: Request) {
    if (request.headers.authorization == process.env.DROPSCHEMA) {
      return this.infoService.resetDatabase();
    }
    throw new UnauthorizedException('Unauthorized');
  }

  @Delete('dropDatabase')
  dropDatabase(@Req() request: Request) {
    if (request.headers.authorization == process.env.DROPSCHEMA) {
      return this.infoService.dropDatabase();
    }
    throw new UnauthorizedException('Unauthorized');
  }

  @Get('package.json')
  getPackageInfo() {
    return this.infoService.getPackageInfo();
  }

  @Get('domain')
  getServerDomain(@Req() request: Request) {
    const domain = `${request.protocol}://${request.get('host')}`;

    const info = {
      domain,
      protocol: request.protocol,
      host: request.get('host'),
      subdomain: request.subdomains[0],
      originalUrl: request.originalUrl,
      baseUrl: request.baseUrl,
      params: request.params,
      query: request.query,
      path: request.path,
      method: request.method,
      headers: request.headers,
      body: request.body,
      route: request.route,
    };
    return info;
  }

  @Get('cookies')
  getCookies(@Req() request: Request) {
    const cookies = this.parseCookies(request.headers.cookie || '');
    return { cookies };
  }

  private parseCookies(cookieHeader: string) {
    const cookies: { [key: string]: string } = {};
    cookieHeader.split(';').forEach((cookie) => {
      const [name, ...rest] = cookie.split('=');
      const value = rest.join('=').trim();
      if (name && value) {
        cookies[name.trim()] = decodeURIComponent(value);
      }
    });
    return cookies;
  }

  @Get('endpoints')
  getAllEndpoints() {
    return this.infoService.listAllEndpoints();
  }

  @Post('runMigrations')
  async runMigrations() {
    return this.infoService.runMigrations();
  }

  @Post('create-env')
  async createEnv(@Body() envData: string) {
    try {
      const envFilePath = path.resolve(__dirname, '..', '..', '.env');
      fs.writeFileSync(envFilePath, envData, 'utf-8');
      const envContent = await this.infoService.readEnvFile();
      return envContent;
    } catch (error) {
      return {
        message: 'Error al crear el archivo .env',
        error: error.message,
      };
    }
  }

  @Get('env')
  async getEnvFile(): Promise<string> {
    return this.infoService.readEnvFile();
  }
}
