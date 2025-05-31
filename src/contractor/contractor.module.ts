import { Module } from '@nestjs/common';
import { ContractorService } from './contractor.service';
import { ContractorController } from './contractor.controller';
import { contractorProviders } from './contractor.providers';
import { DatabaseModule } from 'src/database/database.module';
import { AuthService } from 'src/auth/auth.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [ContractorController],
  providers: [ContractorService,AuthService,...contractorProviders],
  imports:[DatabaseModule,AuthModule]
})
export class ContractorModule {}
