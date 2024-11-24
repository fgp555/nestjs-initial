// back\src\module\user\seed\user.seeder.ts

import { Injectable } from '@nestjs/common';
import { UserService } from '../user.service';
import { CreateUserDto } from '../dtos/create-user.dto';

@Injectable()
export class UserSeederService {
  constructor(private readonly userService: UserService) {}

  async seed() {
    // Crear usuarios de ejemplo
    const users: CreateUserDto[] = [
      {
        name: 'Alice',
        email: 'alice@example.com',
        password: 'password123',
      },
      {
        name: 'Bob',
        email: 'bob@example.com',
        password: 'password123',
      },
      {
        name: 'Charlie',
        email: 'charlie@example.com',
        password: 'password123',
      },
    ];

    // Insertar los usuarios en la base de datos
    for (const user of users) {
      try {
        // Verificar si el usuario con el email ya existe
        const existingUser = await this.userService.findByEmail(user.email);
        if (existingUser) {
          console.log(`User with email ${user.email} already exists.`);
          continue; // Salta la creación de este usuario
        }

        await this.userService.create(user);
        console.log(`User ${user.name} created successfully.`);
      } catch (error) {
        console.error(`Failed to create user ${user.name}: ${error.message}`);
      }
    }
  }
}
