import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ContractorModule } from './contractor/contractor.module';
import { ClientModule } from './client/client.module';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { SpecialityModule } from './speciality/speciality.module';
import { RegionsModule } from './regions/regions.module';
import { NeighborhoodModule } from './neighborhood/neighborhood.module';
import { ReviewModule } from './review/review.module';
import { PaymentModule } from './payment/payment.module';

@Module({
  imports: [ContractorModule, ClientModule, SharedModule, AuthModule, DatabaseModule, SpecialityModule, RegionsModule, NeighborhoodModule, ReviewModule, PaymentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
