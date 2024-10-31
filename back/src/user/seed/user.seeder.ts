import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserSeederService {
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
      },
      {
        email: 'jane.doe@example.com',
        password: 'password123',
        firstName: 'Jane',
      },
    ];

    // Guardar usuarios
    const savedUsers = [];
    for (const userData of usersData) {
      // Verificar si el usuario ya existe
      const existingUser = await this.userRepository.findOne({
        where: { email: userData.email },
      });

      if (!existingUser) {
        const user = await this.userRepository.save(userData);
        savedUsers.push(user);
      } else {
        console.log(`Usuarios ya existe, omitiendo creación.`);
        return;
      }
    }

    console.log('Seeder de usuarios creados con éxito');
  }
}
