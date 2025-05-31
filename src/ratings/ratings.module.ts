import { Module } from '@nestjs/common';
import { RatingsService } from './ratings.service';
import { RatingsController } from './ratings.controller';
import { ratingsProviders } from './ratings.providers';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  controllers: [RatingsController],
  providers: [RatingsService,...ratingsProviders],
  imports:[DatabaseModule]
})
export class RatingsModule {}
