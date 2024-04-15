import { PartialType } from '@nestjs/mapped-types';
import { CreateJobDto } from './create-job.dto';


export class UpdateJobDto extends PartialType(CreateJobDto) {
  id: string;

  contractorID: string;

  clientID: string;

  title: string;

  city: string;

  neighborhood: string;

  region: string;

  streetName: string;

  duration: number;
}
