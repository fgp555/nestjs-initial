import { IsString, IsEmail, MinLength, MaxLength, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MaxLength(100, { message: 'Name should be less than 100 characters' })
  name: string;

  @IsEmail({}, { message: 'Invalid email format' })
  @IsString()
  @MaxLength(255, { message: 'Email should be less than 255 characters' })
  email: string;

  @IsString()
  @MinLength(6, { message: 'Password should be at least 6 characters long' })
  @MaxLength(20, { message: 'Password should be less than 20 characters' })
  password: string;

  @IsOptional()
  @IsString()
  @MaxLength(255, { message: 'Image URL should be less than 255 characters' })
  image?: string;  // Optional field, defaults to a provided value in the service
}
