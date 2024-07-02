import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { BaseDto } from './base.dto';

export class AuthBaseDTO extends BaseDto {
  @ApiProperty({ example: 'admin' })
  @IsString()
  @IsOptional({ always: false })
  role: string;
}
