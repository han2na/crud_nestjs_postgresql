import { PickType } from '@nestjs/swagger';
import { BaseDto } from '../../base/dto/base.dto';

export class UpdateUserDto extends PickType(BaseDto, ['email']) {}
