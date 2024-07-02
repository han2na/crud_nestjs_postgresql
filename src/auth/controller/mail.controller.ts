import { Body, Controller, Post } from '@nestjs/common';
import { Public } from '../../base/decorator/public.decorator';
import { SendEmailDto } from '../../base/dto/send-mail.dto';
import { MailService } from '../../base/mail/mail.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Xác thực')
@Controller('auth')
export class AuthMailController {
  constructor(private readonly mailService: MailService) {}

  @ApiOperation({ summary: 'Gửi mã OTP xác nhận email' })
  @Public()
  @Post('/send-otp')
  async sendEmail(@Body() dto: SendEmailDto) {
    return await this.mailService.sendMail(dto);
  }
}
