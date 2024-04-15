import { Module } from '@nestjs/common';
import { SpecialityService } from './speciality.service';
import { SpecialityController } from './speciality.controller';
import { specialityProviders } from './specility.providers';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  controllers: [SpecialityController],
  providers: [SpecialityService,...specialityProviders],
  imports:[DatabaseModule]
})
export class SpecialityModule {}
