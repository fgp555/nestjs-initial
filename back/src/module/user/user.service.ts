// back\src\module\user\user.service.ts

import {
  Injectable,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { validate } from 'class-validator';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    // Check if a user with the given email already exists
    const existingUser = await this.findByEmail(createUserDto.email).catch(
      () => null,
    );

    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    try {
      // If email does not exist, create and save the new user
      const user = this.userRepository.create(createUserDto);
      return await this.userRepository.save(user);
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to create user',
        error.message,
      );
    }
  }

  async findAll(): Promise<UserEntity[]> {
    try {
      return await this.userRepository.find();
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to fetch users',
        error.message,
      );
    }
  }

  // En el servicio de usuario
  async findByEmail(email: string): Promise<UserEntity | null> {
    if (!email) {
      throw new BadRequestException('Email must be provided');
    }

    // Busca al usuario por el email
    const user = await this.userRepository.findOne({
      where: { email },
    });

    return user || null; // Si no se encuentra, retorna null
  }

  async findOne(id: string): Promise<UserEntity> {
    if (!id || isNaN(Number(id))) {
      throw new BadRequestException('Invalid ID format');
    }

    const user = await this.userRepository.findOne({
      where: { id: Number(id) },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<UserEntity> {
    await this.findOne(id); // Ensures the user exists or throws an error

    try {
      await this.userRepository.update(id, updateUserDto);
      return this.findOne(id);
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to update user',
        error.message,
      );
    }
  }

  async remove(id: string): Promise<UserEntity> {
    const user = await this.findOne(id);

    try {
      return await this.userRepository.remove(user);
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to delete user',
        error.message,
      );
    }
  }
}
