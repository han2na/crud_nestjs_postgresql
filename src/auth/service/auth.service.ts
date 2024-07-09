import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { SignUpDto } from '../dto/sign-up.dto';
import { UserEntity } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { RefreshTokenDto } from '../../base/dto/refresh-token.dto';
import { ConfigService } from '@nestjs/config';
import { TokenDto } from '../../base/dto/token.dto';
import { SignInDto } from '../dto/sign-in.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(UserEntity)
    private readonly authRepository: Repository<UserEntity>,
    private readonly configService: ConfigService,
  ) {}

  async createUser(dto: SignUpDto) {
    const user = await this.authRepository.findOneBy({ email: dto.email });

    if (user) throw new ForbiddenException('AUTH.USER_EMAIL_EXISTED');

    const salt = bcrypt.genSaltSync(10);
    dto.password = bcrypt.hashSync(dto.password, salt);

    const newUser = await this.authRepository.save(dto);

    return await this.getTokens(newUser);
  }

  async signIn(dto: SignInDto) {
    const user: UserEntity = await this.authRepository.findOneBy({
      email: dto.email,
    });
    return await this.getTokens(user);
  }

  async logout(dto: UserEntity) {
    const userGet = await this.authRepository.findOneBy({
      id: dto.id,
    });
    const updateUser: UserEntity = {
      ...userGet,
      id: dto.id,
      uav: userGet.uav + 1,
    };

    await this.authRepository.update(dto.id, updateUser);
    return { data: null };
  }

  async getTokens(user: UserEntity): Promise<TokenDto> {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: user.id,
          email: user.email,
          roles: user.role,
          uav: user.uav,
        },
        {
          secret: this.configService.get<string>('SECRET_KEY_ACCESS_TOKEN'),
          expiresIn: '15m',
        },
      ),
      this.jwtService.signAsync(
        {
          sub: user.id,
          email: user.email,
          roles: user.role,
          uav: user.uav,
        },
        {
          secret: this.configService.get<string>('SECRET_KEY_REFRESH_TOKEN'),
          expiresIn: '7d',
        },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async refreshToken(refreshToken: RefreshTokenDto) {
    try {
      const user = await this.jwtService.verifyAsync(
        refreshToken.refreshToken,
        {
          secret: this.configService.get<string>('SECRET_KEY_REFRESH_TOKEN'),
        },
      );
      return await this.getTokens(user);
    } catch (error) {
      throw new BadRequestException('JWT.REFRESH_AUTH_FAIL');
    }
  }
}
