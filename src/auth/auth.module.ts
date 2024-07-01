import { Module } from '@nestjs/common';
import { AuthService } from './service/auth.service';
import { AuthCanJwt, AuthController } from './controller/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/entities/user.entity';
import { jwtConstants } from './contants';
import { UserModule } from '../user/user.module';
import { UserService } from './service/user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    JwtModule.registerAsync({
      useFactory: async () => ({
        global: true,
        secret: jwtConstants.secret,
        // signOptions: { expiresIn: '60d' },
      }),
    }),
    UserModule,
  ],
  controllers: [AuthController, AuthCanJwt],
  providers: [AuthService, UserService],
})
export class AuthModule {}
