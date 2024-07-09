import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { SignUpDto } from '../dto/sign-up.dto';
import { Public } from '../../base/decorator/public.decorator';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { RefreshTokenDto } from '../../base/dto/refresh-token.dto';
import { LocalGuard } from '../../base/guards/local.guard';
import { LoginUserDto } from '../../base/dto/login-user.dto';
import { TokenDto } from '../../base/dto/token.dto';

@ApiTags('Xác thực')
@Public()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Đăng ký tài khoản mới' })
  @Post('/register')
  async create(@Body() user: SignUpDto) {
    return await this.authService.createUser(user);
  }

  @UseGuards(LocalGuard)
  @Post('/login')
  @ApiOperation({ summary: 'Đăng nhập tài khoản' })
  async signIn(@Body() user: LoginUserDto): Promise<TokenDto> {
    return await this.authService.signIn(user);
  }

  @ApiOperation({ summary: 'Refresh access token' })
  @Post('/refresh-token')
  async refreshToken(@Body() refreshToken: RefreshTokenDto) {
    return await this.authService.refreshToken(refreshToken);
  }
}
