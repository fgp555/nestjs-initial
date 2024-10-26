// src/seeder/seeder.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SeederService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async seed() {
    // Datos de usuarios
    const usersData = [
      {
        email: 'john.doe@example.com',
        password: 'password123',
        firstName: 'John',
        lastName: 'Doe',
      },
      {
        email: 'jane.doe@example.com',
        password: 'password123',
        firstName: 'Jane',
        lastName: 'Doe',
      },
    ];

    // Guardar usuarios
    const savedUsers = [];
    for (const userData of usersData) {
      const user = await this.userRepository.save(userData);
      savedUsers.push(user);
    }

    console.log('Datos de prueba creados con éxito');
  }
}
