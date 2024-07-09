import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserEntity } from '../entities/user.entity';
import { UserAuth } from '../../base/decorator/user-auth.decorator';
import { UserService } from '../user.service';
import { AuthGuard } from '../../base/guards/auth.guard';

@ApiBearerAuth()
@UseGuards(AuthGuard)
@ApiTags('User: Người dùng')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Cập nhật tài khoản người dùng' })
  @Patch('/me')
  update(@UserAuth() user: UserEntity, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(user.id, updateUserDto);
  }

  @ApiOperation({ summary: 'Lấy thông tin tài khoản đang sử dụng' })
  @Get('/me')
  getMe(@UserAuth() user: UserEntity) {
    return user;
  }
}
