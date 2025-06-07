import { Client } from 'src/client/entities/client.entity';
import { Contractor } from 'src/contractor/entities/contractor.entity';

export class CreateRatingDto {
  contractor: Contractor;

  client: Client;

  rate: number;

  comment: string;
}
