// create-user.dto.ts
import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Length(8, 20)
  password: string;

  @IsNotEmpty()
  @Length(2, 100)
  firstName: string;

  @IsNotEmpty()
  @Length(2, 100)
  lastName: string;
}
