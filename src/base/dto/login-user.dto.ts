import { IsEmail, IsNotEmpty, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
  @ApiProperty({ example: 'ngocanhk10r@gmail.com' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'ngocanhk10r@gmail.com' })
  @IsNotEmpty()
  @Length(3, 30)
  password: string;
}
