import { PartialType } from '@nestjs/mapped-types';
import { CreateClientDto } from './create-client.dto';
import { Job } from 'src/job/entities/job.entity';

export class UpdateClientDto extends PartialType(CreateClientDto) {
  id: string;

  fullname: string;

  email: string;

  birthday: string;

  cpf: string;

  password: string;

  state?: string;

  city?: string;
  
  jobs: Job[];
}
