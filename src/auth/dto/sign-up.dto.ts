import { IsEmail, IsNotEmpty } from 'class-validator';
import { EmailBase } from 'src/base/dto/base.dto';

export class SignUpDto extends EmailBase {
  @IsNotEmpty()
  password: string;
}
