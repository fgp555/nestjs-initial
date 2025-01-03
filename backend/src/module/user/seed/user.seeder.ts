// back\src\module\user\seed\user.seeder.ts

import { Injectable } from '@nestjs/common';
import { UserService } from '../user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserSeederService {
  constructor(private readonly userService: UserService) {}

  async seed() {
    // Crear usuarios de ejemplo

    const hashedPassword = await bcrypt.hash('SecurePass@2023', 10);

    const users: any[] = [
      // Usuarios de ejemplo
      {
        firstName: 'Juan',
        lastName: 'Lopez',
        email: 'juan123@gmail.com',
        whatsapp: '+51222333444',
        username: 'patient_lionel',
        password: hashedPassword,
        confirmPassword: hashedPassword,
        birthdate: '1987-06-24',
        nDni: '27894561',
        role: 'patient',
      },
      {
        firstName: 'Pedro',
        lastName: 'Inglés',
        email: 'pedro123@gmail.com',
        whatsapp: '+51912312322',
        username: 'pedro_patient',
        password: hashedPassword,
        confirmPassword: hashedPassword,
        birthdate: '1988-04-20',
        nDni: '04440555',
        role: 'patient',
      },
      {
        firstName: 'Liam',
        lastName: 'Johnson',
        email: 'liam.johnson@cliniccare.com',
        whatsapp: '+5491123456792',
        username: 'patient_liam',
        password: hashedPassword,
        confirmPassword: hashedPassword,
        birthdate: '1990-07-15',
        nDni: '30456789',
        role: 'patient',
      },
      {
        firstName: 'Sophia',
        lastName: 'Williams',
        email: 'sophia.williams@cliniccare.com',
        whatsapp: '+5491123456793',
        username: 'patient_sophia',
        password: hashedPassword,
        confirmPassword: hashedPassword,
        birthdate: '1995-08-22',
        nDni: '29012345',
        role: 'patient',
      },
      {
        firstName: 'Ava',
        lastName: 'Davis',
        email: 'ava.davis@cliniccare.com',
        whatsapp: '+5491123456794',
        username: 'patient_ava',
        password: hashedPassword,
        confirmPassword: hashedPassword,
        birthdate: '1992-04-11',
        nDni: '30234567',
        role: 'patient',
      },
      {
        firstName: 'Noah',
        lastName: 'Martinez',
        email: 'noah.martinez@cliniccare.com',
        whatsapp: '+5491123456795',
        username: 'patient_noah',
        password: hashedPassword,
        confirmPassword: hashedPassword,
        birthdate: '1998-05-20',
        nDni: '30123456',
        role: 'patient',
      },
      {
        firstName: 'Emma',
        lastName: 'Taylor',
        email: 'emma.taylor@cliniccare.com',
        whatsapp: '+5491123456796',
        username: 'patient_emma',
        password: hashedPassword,
        confirmPassword: hashedPassword,
        birthdate: '2000-03-30',
        nDni: '30012345',
        role: 'patient',
      },
      {
        firstName: 'Oliver',
        lastName: 'Anderson',
        email: 'oliver.anderson@cliniccare.com',
        whatsapp: '+5491123456797',
        username: 'patient_oliver',
        password: hashedPassword,
        confirmPassword: hashedPassword,
        birthdate: '1997-02-10',
        nDni: '30234567',
        role: 'patient',
      },
      {
        firstName: 'Isabella',
        lastName: 'Thomas',
        email: 'isabella.thomas@cliniccare.com',
        whatsapp: '+5491123456798',
        username: 'patient_isabella',
        password: hashedPassword,
        confirmPassword: hashedPassword,
        birthdate: '1996-01-20',
        nDni: '30123456',
        role: 'patient',
      },
      // Profesionales
      {
        title: 'Doctor',
        firstName: 'Lucas',
        lastName: 'Anderson',
        email: 'lucas.anderson@cliniccare.com',
        whatsapp: '+5491123456802',
        username: 'profesional_lucas',
        password: hashedPassword,
        confirmPassword: hashedPassword,
        birthdate: '1980-10-14',
        nDni: '29543218',
        role: 'professional',
        image: 'https://i.postimg.cc/nchWgyY7/01.jpg',
        specialization: 'Medicina General',
        bio: 'El Dr. Lucas Anderson es reconocido por su atención personalizada y compromiso con la salud familiar.',
        gender: 'man',
      },
      {
        title: 'Licenciada',
        firstName: 'Olivia',
        lastName: 'Bennett',
        email: 'olivia.bennett@cliniccare.com',
        whatsapp: '+5491123456804',
        username: 'profesional_olivia',
        password: hashedPassword,
        confirmPassword: hashedPassword,
        birthdate: '1987-09-25',
        nDni: '32547890',
        role: 'professional',
        image: 'https://i.postimg.cc/HW2KSY5d/02.jpg',
        specialization: 'Psicología Infantil',
        bio: 'La Lic. Olivia Bennett se especializa en ayudar a niños y familias a construir un bienestar emocional saludable.',
        gender: 'woman',
      },
      {
        title: 'Doctor',
        firstName: 'Ethan',
        lastName: 'Miller',
        email: 'ethan.miller@cliniccare.com',
        whatsapp: '+5491123456803',
        username: 'profesional_ethan',
        password: hashedPassword,
        confirmPassword: hashedPassword,
        birthdate: '1975-06-08',
        nDni: '29304567',
        role: 'professional',
        image: 'https://i.postimg.cc/ZnVM0HZC/03.jpg',
        specialization: 'Neurología',
        bio: 'El Dr. Ethan Miller lidera en el campo de la neurología con un enfoque innovador y empático hacia los pacientes.',
        gender: 'man',
      },
      {
        title: 'Licenciada',
        firstName: 'Sofia',
        lastName: 'Garcia',
        email: 'sofia.garcia@cliniccare.com',
        whatsapp: '+5491123456804',
        username: 'profesional_sofia',
        password: hashedPassword,
        confirmPassword: hashedPassword,
        birthdate: '1993-02-14',
        nDni: '32547890',
        role: 'professional',
        image: 'https://i.postimg.cc/HW2KSY5d/02.jpg',
        specialization: 'Fisioterapia',
        bio: 'La Lic. Sofia Garcia tiene una amplia experiencia en fisioterapia deportiva, ayudando a pacientes a recuperarse y superar límites.',
        gender: 'woman',
      },
      {
        title: 'Administrador',
        firstName: 'Oliver',
        lastName: 'Smith',
        email: 'admin@cliniccare.com',
        whatsapp: '+5491123456805',
        username: 'admin',
        password: hashedPassword,
        confirmPassword: hashedPassword,
        birthdate: '2022-01-01',
        nDni: '30000000',
        role: 'admin',
      },
    ];

    // Insertar los usuarios en la base de datos
    for (const user of users) {
      try {
        if (user.email) {
          // Verificar si el usuario con el email ya existe
          const existingUser = await this.userService.findByEmail(user.email);
          if (existingUser) {
            console.log(`User with email ${user.email} already exists.`);
            continue; // Salta la creación de este usuario
          }
        }

        await this.userService.create(user);
        // await this.authController.signup(user);
        console.log(`User ${user.firstName} created successfully.`);
      } catch (error) {
        console.error(
          `Failed to create user ${user.firstName}: ${error.message}`,
        );
      }
    }
  }
}
