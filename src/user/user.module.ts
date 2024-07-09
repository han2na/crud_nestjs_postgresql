import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UserController } from './controller/user.controller';
import { UserService } from './user.service';
import { UserEntity } from 'src/user/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { AuthJwtService } from '../auth/service/auth-jwt.service';
import { AdminController } from './controller/admin.controller';
import { UserMiddleware } from '../base/middlewares/user.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController, AdminController],
  providers: [UserService, JwtService, AuthJwtService],
  exports: [UserService],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UserMiddleware).forRoutes(UserController, AdminController);
  }
}
