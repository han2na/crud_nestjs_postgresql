import { IsEmail, Length } from 'class-validator';

export class EmailBase {
  @IsEmail()
  @Length(3, 30)
  email: string;
}
