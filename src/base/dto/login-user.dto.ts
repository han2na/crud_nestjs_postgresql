import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class LoginUserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsNotEmpty()
  @Length(3, 30)
  password: string;
}
