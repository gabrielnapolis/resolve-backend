import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { DatabaseModule } from 'src/database/database.module';

@Module({  
  providers: [EmailService],
  imports:[DatabaseModule],
  exports: [EmailService]
})
export class SharedModule {
    
}
