import {
  Controller,
  Post,
  Body,
  UnauthorizedException,
  UseGuards,
  Put,
  Param,
  InternalServerErrorException,
  Patch,
  NotFoundException,
  Injectable,
} from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from './auth.guard';
import { UpdateUserDto } from '../user/dtos/update-user.dto';
import { MailService } from '../mail/mail.service';
import { MailTemplatesService } from '../mail/mail-template.service';

// import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
    private readonly emailTemplatesService: MailTemplatesService, // Inyecta el servicio de plantillas
  ) {}

  async signup(@Body() body: any) {
    // if (body.email) {
    //   const find = await this.userService.findOneEmail(body.email);
    //   if (find) throw new UnauthorizedException('This email already exists');
    // }
    // if (body.password) {
    //   body.password = await bcrypt.hash(body.password, 10);
    // }
    try {
      const userCreate = await this.userService.create(body);
      const { password, ...withoutPassword } = userCreate;
      console.log('withoutPassword', withoutPassword);

      const tempData = {
        to: 'fgp555@gmail.com',
        name: 'Frank GP',
        message:
          'Bienvenido a nuestro servicio. Estamos felices de tenerte con nosotros.',
        text: 'Este es el contenido alternativo en texto plano.',
      };

      await this.sendEmail(tempData);

      return withoutPassword;
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to create user',
        error.message,
      );
    }
  }

  async sendEmail(@Body() body: any) {
    // Obtener la plantilla de correo
    const template = await this.emailTemplatesService.getTemplateById(1); // ID de la plantilla
    if (!template) {
      throw new NotFoundException('Plantilla no encontrada');
    }

    // Reemplazar placeholders con los datos dinámicos
    const placeholders = {
      name: body.name || 'Usuario',
      message: body.message || 'Gracias por registrarte en nuestro servicio.',
    };
    const personalizedHtml = this.replacePlaceholders(
      template.htmlContent,
      placeholders,
    );

    // Crear cuerpo del correo
    const emailBody = {
      to: body.to || 'fgp555@gmail.com', // Usar dirección de destino dinámica si se proporciona
      subject: template.subject,
      text: body.text || 'Este es el contenido del correo en texto plano',
      html: personalizedHtml,
    };

    // Enviar correo
    try {
      const result = await this.mailService.sendMail(emailBody); // Asegúrate de descomentar cuando esté listo
      console.log('Email sent successfully:', result);
      return { message: 'Correo enviado exitosamente', result };
    } catch (error) {
      console.error('Error sending email:', error);
      throw new InternalServerErrorException('Error al enviar el correo');
    }
  }

  // Función para reemplazar los placeholders en la plantilla
  private replacePlaceholders(
    template: string,
    variables: Record<string, string>,
  ): string {
    return template.replace(
      /{{(\w+)}}/g,
      (_, key) => variables[key] || `{{${key}}}`,
    );
  }

  async singin(@Body() createAuthDto: CreateAuthDto) {
    const foundEmail = await this.userService.findOneEmail(createAuthDto.email);

    if (!foundEmail)
      throw new UnauthorizedException('Incorrect email or password');

    const isPasswordValid = await bcrypt.compare(
      createAuthDto.password,
      foundEmail.password,
    );

    if (!isPasswordValid)
      throw new UnauthorizedException('Incorrect email or password');

    const { password, ...user } = foundEmail;

    const userPayload = {
      sub: foundEmail.id,
      id: foundEmail.id,
      email: foundEmail.email,
    };

    const token = this.jwtService.sign(userPayload);

    return { login: true, user, token };
  }

  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    // Hash the password if it exists in the payload
    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }

    try {
      const updatedUser = await this.userService.update(id, updateUserDto);
      const { password, ...withoutPassword } = updatedUser;
      console.log('password', password);
      return withoutPassword;
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to update user',
        error.message,
      );
    }
  }
}
