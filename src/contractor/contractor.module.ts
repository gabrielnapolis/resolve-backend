import { Module } from '@nestjs/common';
import { ContractorService } from './contractor.service';
import { ContractorController } from './contractor.controller';
import { contractorProviders } from './contractor.providers';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  controllers: [ContractorController],
  providers: [ContractorService,...contractorProviders],
  imports:[DatabaseModule]
})
export class ContractorModule {}
