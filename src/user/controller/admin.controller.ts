import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
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

  @ApiOperation({ summary: 'Lấy thông tin tài khoản' })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findOne(id);
  }

  @ApiOperation({ summary: 'Cập nhật tài khoản' })
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(+id, updateUserDto);
  }

  @ApiOperation({ summary: 'Xóa tài khoản' })
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.userService.remove(+id);
  }

  @ApiOperation({ summary: 'Danh sách tài khoản' })
  @Get()
  findAll() {
    return this.userService.findAll();
  }
}
