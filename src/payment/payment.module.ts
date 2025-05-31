import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { paymentProviders } from './payment.providers';
import { PagbankRepository } from './repository/pagbank.repository';
import { SubscriptionRepository } from './repository/subscription.repository';
import { DatabaseModule } from 'src/database/database.module';
import { AuthModule } from 'src/auth/auth.module';
import { AuthService } from 'src/auth/auth.service';

@Module({
  controllers: [PaymentController],
  providers: [
AuthService,
    PaymentService, 
    PagbankRepository, 
    SubscriptionRepository, 
    ...paymentProviders],
  imports:[DatabaseModule],
  exports: [SubscriptionRepository]

})
export class PaymentModule {}
