import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userReporitory: Repository<UserEntity>,
  ) {}

  async findAll() {
    return await this.userReporitory.find();
  }

  async findOne(id: number) {
    return await this.userReporitory.findOneBy({ id: id });
  }

  async update(id: number, dto: UpdateUserDto) {
    return await this.userReporitory.update(id, dto);
  }

  async remove(id: number) {
    return await this.userReporitory.delete(id);
  }
}
