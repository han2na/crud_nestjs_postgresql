import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthJwtService } from '../../auth/service/auth-jwt.service';
import { UserEntity } from '../../user/entities/user.entity';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authJwtService: AuthJwtService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }

  async validate(email: string, password: string) {
    const user: UserEntity = await this.authJwtService.validateUser(
      email,
      password,
    );

    if (!user)
      throw new UnauthorizedException('AUTH.USER_OR_EMAIL_NOT_CORRECT');
  }
}
