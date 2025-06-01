import { Module } from '@nestjs/common';
import { ContractorService } from './contractor.service';
import { ContractorController } from './contractor.controller';
import { contractorProviders } from './contractor.providers';
import { DatabaseModule } from 'src/database/database.module';
import { AuthService } from 'src/auth/auth.service';
import { AuthModule } from 'src/auth/auth.module';
import { SharedModule } from 'src/shared/shared.module';

@Module({
  controllers: [ContractorController],
  providers: [ContractorService,AuthService,...contractorProviders],
  imports:[DatabaseModule,AuthModule,SharedModule]
})
export class ContractorModule {}
