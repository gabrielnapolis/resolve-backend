import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { paymentProviders } from './payment.providers';
import { PagbankRepository } from './repository/pagbank.repository';
import { SubscriptionRepository } from './repository/subscription.repository';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  controllers: [PaymentController],
  providers: [PaymentService, PagbankRepository, SubscriptionRepository, ...paymentProviders],
  imports:[DatabaseModule]

})
export class PaymentModule {}
