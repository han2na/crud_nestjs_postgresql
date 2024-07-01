import {
  Body,
  Controller,
  HttpException,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { SignInDto } from '../dto/sign-in.dto';
import { SignUpDto } from '../dto/sign-up.dto';
import { AuthGuard } from '../../base/guards/auth.guard';
import { Public } from '../../base/decorator/public.decorator';
import { UserAuth } from '../../base/decorator/user-auth.decorator';
import { UserEntity } from '../../user/entities/user.entity';

@Public()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async signIn(@Body() user: SignInDto) {
    console.log('Login');
    try {
      return await this.authService.signIn(user.email, user.password);
    } catch (error) {
      throw new HttpException('SignIn failed', error);
    }
  }

  @Post('/register')
  async create(@Body() user: SignUpDto) {
    try {
      return await this.authService.createUser(user);
    } catch (error) {
      throw new error();
    }
  }

  @Post('/refresh-token')
  async refreshToken(@Body('refreshToken') refreshToken: string) {
    try {
      return await this.authService.refreshToken(refreshToken);
    } catch (error) {
      throw new error();
    }
  }
}

@Controller('auth')
export class AuthCanJwt {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard)
  @Post('/logout')
  async logout(@UserAuth() user) {
    return await this.authService.logOut(user);
  }
}
