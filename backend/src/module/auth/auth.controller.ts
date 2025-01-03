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
} from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from './auth.guard';
import { UpdateUserDto } from '../user/dtos/update-user.dto';
import { MailTemplatesService } from '../mail/mail-template.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly emailTemplatesService: MailTemplatesService, // Inyecta el servicio de plantillas
  ) {}

  @Post('signup')
  // @UseGuards(AuthGuard)
  async signup(@Body() body: any) {
    if (body.sendMail && body.email) {
      const find = await this.userService.findOneEmail(body.email);
      if (find) throw new UnauthorizedException('This email already exists');
    }
    if (body.password) {
      body.password = await bcrypt.hash(body.password, 10);
    }
    try {
      const userCreate = await this.userService.create(body);
      const { password, ...withoutPassword } = userCreate;

      if (body.sendMail && body.email) {
        const sendMail =
          await this.emailTemplatesService.sentMailRegister(body);
        return { withoutPassword, sendMail };
      } else {
        return withoutPassword;
      }
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to create user',
        error.message,
      );
    }
  }

  @Post('signin')
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

  @Patch('update/:id')
  async updateUser(@Param('id') id: string, @Body() body: any) {
    // Hash the password if it exists in the payload
    console.log('updateUserDto', body);
    if (body.password) {
      body.password = await bcrypt.hash(body.password, 10);
    }

    try {
      const updatedUser = await this.userService.update(id, body);
      console.log('updatedUser', updatedUser);
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
