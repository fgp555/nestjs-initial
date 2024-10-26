// create-user.dto.ts
import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @Length(2, 100)
  firstName: string;
}
