import { Module } from '@nestjs/common';
import { JobService } from './job.service';
import { JobController } from './job.controller';
import { jobProviders } from './job.providers';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  controllers: [JobController],
  providers: [JobService,...jobProviders],
  imports:[DatabaseModule]
})
export class JobModule {}
