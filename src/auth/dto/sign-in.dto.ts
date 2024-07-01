import { OmitType, PartialType, PickType } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { EmailBase } from 'src/base/dto/base.dto';

export class SignInDto extends EmailBase {
  @IsNotEmpty()
  password: string;
}
