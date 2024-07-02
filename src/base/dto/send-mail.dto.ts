import { ApiProperty } from '@nestjs/swagger';

export class SendEmailDto {
  @ApiProperty({ example: 'ngocanhk10r@gmail.com' })
  email: string;
  @ApiProperty({ example: 'www.google.com' })
  prefix: string;
}
