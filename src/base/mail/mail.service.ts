import { Injectable, UnauthorizedException } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { SendEmailDto } from '../dto/send-mail.dto';
import { Address } from '@nestjs-modules/mailer/dist/interfaces/send-mail-options.interface';
import { ConfigService } from '@nestjs/config';
import { htmlSend } from './send-mail.constant';
import { authenticator } from 'otplib';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../../user/entities/user.entity';
import { CheckEmailDto } from '../dto/check-email.dto';

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async genOtp(email: string): Promise<string> {
    const user = await this.getUser(email);

    authenticator.options = { digits: 4, step: 300 };

    return authenticator.generate(email + user.uav);
  }

  async getUser(email: string): Promise<UserEntity> {
    const user = await this.userRepository.findOneBy({ email: email });
    if (!user) {
      throw new UnauthorizedException('User does not exist');
    }
    return user;
  }

  async verifyEmail(dto: CheckEmailDto) {
    const user = await this.getUser(dto.email);
    try {
      const check = authenticator.check(dto.otp, dto.email + user.uav);

      if (!check) {
        throw new UnauthorizedException('AUTH.OTP_FAIL');
      }

      return { data: null };
    } catch (err) {
      throw new UnauthorizedException('AUTH.OTP_FAIL');
    }
  }

  async sendMail(dto: SendEmailDto) {
    const sender: Address = {
      name: this.configService.get<string>('MAIL_NAME'),
      address: this.configService.get<string>('MAIL_SENDER'),
    };

    const otp = await this.genOtp(dto.email);

    try {
      return await this.mailerService.sendMail({
        from: sender,
        to: dto.email,
        subject: '[CRUD] Verify account email',
        html: htmlSend(otp, dto.prefix),
      });
    } catch (error) {
      console.log(error);
    }
  }
}
