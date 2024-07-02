import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UserEntity } from './user/entities/user.entity';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './base/guards/role.guard';
import { AuthGuard } from './base/guards/auth.guard';
import { MailModule } from './base/mail/mail.module';
import { HealthModule } from './base/health/health.module';

@Module({
  imports: [
    HealthModule,
    AuthModule,
    UserModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'crud_nestjs_postgresql',
      entities: [UserEntity],
      synchronize: true,
    }),
    MailModule,
  ],
  providers: [
    JwtService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
