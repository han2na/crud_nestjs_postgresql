import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UserService } from 'src/user/user.service';
import { SignUpDto } from '../dto/sign-up.dto';
import { UserEntity } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { jwtConstants } from '../contants';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    @InjectRepository(UserEntity)
    private readonly authRepository: Repository<UserEntity>,
  ) {}

  async createUser(dto: SignUpDto) {
    const user = await this.authRepository.findOneBy({ email: dto.email });

    if (user) throw new ForbiddenException('AUTH.USER_EMAIL_EXISTED');

    const salt = bcrypt.genSaltSync(10);
    dto.password = bcrypt.hashSync(dto.password, salt);

    const newUser = await this.authRepository.save(dto);

    return await this.getTokens(newUser);
  }

  async signIn(email: string, pass: string) {
    const user = await this.authRepository.findOneBy({ email: email });
    if (!user) throw new ForbiddenException('AUTH.USER_OR_EMAIL_NOT_CORRECT');
    const hashMatch = await bcrypt.compareSync(pass, user.password);
    if (!hashMatch)
      throw new ForbiddenException('AUTH.USER_OR_EMAIL_NOT_CORRECT');
    return await this.getTokens(user);
  }

  async logOut(dto) {
    const userGet = await this.authRepository.findOneBy({ id: dto.sub });
    if (userGet.uav != dto.uav)
      throw new ForbiddenException('JWT.TOKEN_EXPIRED');
    const updateUser = {
      ...userGet,
      id: dto.sub,
      uav: userGet.uav + 1,
    };
    await this.authRepository.update(dto.sub, updateUser);
    return;
  }

  async getTokens(user: UserEntity) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: user.id,
          email: user.email,
          roles: user.role,
          uav: user.uav,
        },
        {
          secret: process.env.SECRET_KEY_ACCESS_TOKEN,
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
          secret: process.env.SECRET_KEY_REFRESH_TOKEN,
          expiresIn: '7d',
        },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async refreshToken(refreshToken: string) {
    const user = await this.jwtService.verifyAsync(refreshToken, {
      secret: jwtConstants.secret,
    });
    return await this.getTokens(user);
  }
}
