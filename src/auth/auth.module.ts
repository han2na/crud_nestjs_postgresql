import { Module } from '@nestjs/common';
import { AuthService } from './service/auth.service';
import { AuthController } from './controller/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/entities/user.entity';
import { UserModule } from '../user/user.module';
import { AuthJwtService } from './service/auth-jwt.service';
import { AuthUserController } from './controller/user.controller';
import { MailModule } from '../base/mail/mail.module';
import { AuthMailController } from './controller/mail.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    JwtModule.registerAsync({
      useFactory: async () => ({
        global: true,
      }),
    }),
    UserModule,
    MailModule,
  ],
  controllers: [AuthController, AuthUserController, AuthMailController],
  providers: [AuthService, AuthJwtService],
  exports: [AuthJwtService],
})
export class AuthModule {}
