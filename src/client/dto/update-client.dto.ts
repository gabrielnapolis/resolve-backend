import { PartialType } from '@nestjs/mapped-types';
import { CreateClientDto } from './create-client.dto';

export class UpdateClientDto extends PartialType(CreateClientDto) {
  id: string;

  fullname: string;

  email: string;

  birthday: string;

  cpf?: string;

  password: string;

  state?: string;

  city?: string;
}
