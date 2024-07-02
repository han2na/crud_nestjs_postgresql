import { IsEmail, IsNotEmpty, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class BaseDto {
  @ApiProperty({ example: 'ngocanhk10r@gmail.com' })
  @IsNotEmpty()
  @IsEmail()
  @Length(3, 30)
  email: string;

  @ApiProperty({ example: 'password' })
  @IsNotEmpty()
  @Length(3, 50)
  password: string;
}
