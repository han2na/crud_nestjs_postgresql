import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../../user/entities/user.entity';
import { Repository } from 'typeorm';
import { CheckUavDto } from '../dto/check-uav.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthJwtService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async userData(dto: CheckUavDto): Promise<UserEntity> {
    const user: UserEntity = await this.userRepository.findOneBy({
      id: dto.sub,
    });

    if (user.uav !== dto.uav || !user) {
      return null;
    }
    return user;
  }

  async validateUser(email: string, password: string): Promise<UserEntity> {
    const user: UserEntity = await this.userRepository.findOneBy({
      email: email,
    });

    if (!user) return null;

    const hashMatch = await bcrypt.compareSync(password, user.password);

    if (!hashMatch) return null;

    return user;
  }
}
