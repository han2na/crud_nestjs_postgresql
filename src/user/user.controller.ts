import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';
import { AuthGuard } from '../base/guards/auth.guard';
import { Roles } from '../base/decorator/roles.decorator';
import { Role } from '../base/enums/role.enum';
import { UserAuth } from '../base/decorator/user-auth.decorator';
import { UserEntity } from './entities/user.entity';

@UseGuards(AuthGuard)
@Controller('User')
export class UserController {
  constructor(private readonly UserService: UserService) {}

  @Roles(Role.Admin)
  @Get()
  findAll() {
    return this.UserService.findAll();
  }

  @Roles(Role.Admin)
  @Get('/me')
  getMe(@UserAuth() user) {
    return user;
  }

  @Roles(Role.Admin)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.UserService.findOne(+id);
  }

  @Roles(Role.Admin)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.UserService.update(+id, updateUserDto);
  }

  @Roles(Role.Admin)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.UserService.remove(+id);
  }
}
