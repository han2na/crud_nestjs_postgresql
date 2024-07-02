import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../../user/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthJwtService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async userData(dto): Promise<UserEntity> {
    const user: UserEntity = await this.userRepository.findOneBy({
      id: dto.sub,
    });
    if (user.uav !== dto.uav || !user) {
      return null;
    }
    return user;
  }
}
