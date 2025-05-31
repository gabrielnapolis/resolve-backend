import { Global, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { authProviders } from './auth.providers';
import { DatabaseModule } from 'src/database/database.module';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategy/passport.strategy';
import { JwtAuthGuard } from './guard/passport-auth.guard';
import { PaymentModule } from 'src/payment/payment.module';
import { FacebookStrategy } from './strategy/facebook.strategy';
import { GoogleStrategy } from './strategy/google.strategy';
import { APP_GUARD } from '@nestjs/core';
@Module({
  imports: [
    JwtModule.registerAsync({
      global: true,
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: '1h' },
      }),
      inject: [ConfigService],
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    PassportModule,
    DatabaseModule,
    PaymentModule,
    PassportModule.register({ defaultStrategy: 'google'})
  ],
  controllers: [AuthController],
  providers: [
    
    AuthService,
    JwtAuthGuard,
    JwtStrategy,
    FacebookStrategy,
    GoogleStrategy,
    ...authProviders,
  ],
  exports: [AuthService, JwtModule, JwtAuthGuard, PassportModule, JwtStrategy, FacebookStrategy, GoogleStrategy],
})
export class AuthModule {}
