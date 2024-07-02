import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsNumber, Length } from 'class-validator';

export class CheckEmailDto {
  @ApiProperty({ example: 'ngocanhk10r@gmail.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'string' })
  @Length(4, 4)
  @IsNotEmpty()
  otp: string;
}
