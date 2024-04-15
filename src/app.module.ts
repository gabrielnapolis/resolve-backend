import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ContractorModule } from './contractor/contractor.module';
import { ClientModule } from './client/client.module';
import { JobModule } from './job/job.module';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { SpecialityModule } from './speciality/speciality.module';
import { RegionsModule } from './regions/regions.module';
import { NeighborhoodModule } from './neighborhood/neighborhood.module';
import { ReviewModule } from './review/review.module';

@Module({
  imports: [ContractorModule, ClientModule, JobModule, SharedModule, AuthModule, DatabaseModule, SpecialityModule, RegionsModule, NeighborhoodModule, ReviewModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
