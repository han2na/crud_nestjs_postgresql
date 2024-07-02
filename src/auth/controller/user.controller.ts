import { Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { AuthGuard } from '../../base/guards/auth.guard';
import { UserAuth } from '../../base/decorator/user-auth.decorator';
import { UserEntity } from '../../user/entities/user.entity';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Xác thực')
@Controller('auth')
export class AuthUserController {
  constructor(private readonly authService: AuthService) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Đăng xuất thiết bị' })
  @UseGuards(AuthGuard)
  @Post('/logout')
  async logout(@UserAuth() user: UserEntity) {
    return await this.authService.logout(user);
  }
}
