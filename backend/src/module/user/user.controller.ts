// back\src\module\user\user.controller.ts

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserEntity } from './entities/user.entity';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<UserEntity> {
    if (!Object.keys(createUserDto).length) {
      throw new BadRequestException('Request body cannot be empty');
    }
    return await this.userService.create(createUserDto);
  }

  @Get()
  async findAll(): Promise<UserEntity[]> {
    return await this.userService.findAll();
  }

  @Get('by-email')
  async findByEmail(@Query('email') email: string): Promise<UserEntity> {
    if (!email) {
      throw new BadRequestException('Email query parameter must be provided');
    }
    return await this.userService.findByEmail(email);
  }
  // Nuevo endpoint para obtener usuarios por tipo
  @Get('role')
  async findByRole(
    @Query('role') role: 'admin' | 'patient' | 'professional' = 'patient',
    @Query('orderBy') orderBy: string = 'firstName',
    @Query('order') order: 'ASC' | 'DESC' = 'ASC',
    @Query('limit') limit?: number,
  ) {
    return await this.userService.findByRole(role, orderBy, order, limit);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<UserEntity> {
    if (!id || isNaN(Number(id))) {
      throw new BadRequestException('Invalid ID format');
    }
    return await this.userService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserEntity> {
    if (!Object.keys(updateUserDto).length) {
      throw new BadRequestException('Update body cannot be empty');
    }
    return await this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<UserEntity> {
    if (!id || isNaN(Number(id))) {
      throw new BadRequestException('Invalid ID format');
    }
    return await this.userService.remove(id);
  }
}
