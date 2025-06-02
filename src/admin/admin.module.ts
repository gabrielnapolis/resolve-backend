import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';

import { AuthModule } from 'src/auth/auth.module';
import { AuthService } from 'src/auth/auth.service';
import { DatabaseModule } from 'src/database/database.module';
import { SharedModule } from 'src/shared/shared.module';
import { adminProviders } from './admin.providers';


@Module({
  controllers: [AdminController],
  providers: [AdminService,...adminProviders],
  imports:[DatabaseModule,AuthModule,SharedModule]
})
export class AdminModule {}
