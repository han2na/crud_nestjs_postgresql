import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserAuth } from '../../base/decorator/user-auth.decorator';
import { UserEntity } from '../entities/user.entity';
import { UserService } from '../user.service';
import { UpdateUserDto } from '../dto/update-user.dto';
import { AuthGuard } from '../../base/guards/auth.guard';

@UseGuards(AuthGuard)
@ApiTags('User: Người dùng')
@ApiBearerAuth()
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Lấy thông tin tài khoản đang sử dụng' })
  @Get('/me')
  getMe(@UserAuth() user: UserEntity) {
    return user;
  }

  @ApiOperation({ summary: 'Cập nhật tài khoản người dùng' })
  @Patch('/me')
  update(@UserAuth() user: UserEntity, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(user.id, updateUserDto);
  }
}
