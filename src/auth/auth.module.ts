import { Module } from '@nestjs/common';
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

@Module({imports: [
  JwtModule.registerAsync({
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
  PaymentModule
],
  controllers: [AuthController],
  providers: [
    AuthService, 
    JwtStrategy,
    JwtAuthGuard, 
    ...authProviders],
})
export class AuthModule {}
