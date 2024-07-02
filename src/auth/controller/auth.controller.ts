import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { SignInDto } from '../dto/sign-in.dto';
import { SignUpDto } from '../dto/sign-up.dto';
import { Public } from '../../base/decorator/public.decorator';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { RefreshTokenDto } from '../../base/dto/refresh-token.dto';

@ApiTags('Xác thực')
@Public()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Đăng nhập tài khoản' })
  @Post('/login')
  async signIn(@Body() user: SignInDto) {
    return await this.authService.signIn(user.email, user.password);
  }

  @ApiOperation({ summary: 'Đăng ký tài khoản mới' })
  @Post('/register')
  async create(@Body() user: SignUpDto) {
    return await this.authService.createUser(user);
  }

  @ApiOperation({ summary: 'Refresh access token' })
  @Post('/refresh-token')
  async refreshToken(@Body() refreshToken: RefreshTokenDto) {
    return await this.authService.refreshToken(refreshToken);
  }
}
