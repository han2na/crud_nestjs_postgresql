import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { UserService } from '../user.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from '../../base/decorator/roles.decorator';
import { Role } from '../../base/enums/role.enum';
import { UpdateUserDto } from '../dto/update-user.dto';
import { AuthGuard } from '../../base/guards/auth.guard';

@ApiTags('Admin: Người dùng')
@ApiBearerAuth()
@Roles(Role.Admin)
@UseGuards(AuthGuard)
@Controller('users')
export class AdminController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Danh sách tài khoản' })
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @ApiOperation({ summary: 'Lấy thông tin tài khoản' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @ApiOperation({ summary: 'Cập nhật tài khoản' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @ApiOperation({ summary: 'Xóa tài khoản' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
