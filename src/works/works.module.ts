import { Module } from '@nestjs/common';
import { WorksService } from './works.service';
import { WorksController } from './works.controller';
import { DatabaseModule } from 'src/database/database.module';
import { workProviders } from './work.provider';

@Module({
  controllers: [WorksController],
  providers: [WorksService,...workProviders],
  imports:[DatabaseModule]
})
export class WorksModule {}
