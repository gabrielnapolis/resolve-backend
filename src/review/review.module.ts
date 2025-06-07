import { Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { reviewProviders } from './review.provider';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  controllers: [ReviewController],
  providers: [ReviewService,...reviewProviders],
   imports:[DatabaseModule]
})
export class ReviewModule {}
