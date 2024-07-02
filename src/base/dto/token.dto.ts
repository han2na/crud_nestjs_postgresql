import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class TokenDto {
  @ApiProperty({ example: 'string' })
  @IsNotEmpty()
  refreshToken: string;

  @IsNotEmpty()
  accessToken: string;
}
