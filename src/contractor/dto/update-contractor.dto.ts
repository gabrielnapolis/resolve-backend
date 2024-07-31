import { PartialType } from '@nestjs/mapped-types';
import { CreateContractorDto } from './create-contractor.dto';

export class UpdateContractorDto extends PartialType(CreateContractorDto) {
  id: string;

  picture: string;

  fullname: string;

  birthday: string
    
  cpf:string

  email: string;

  commercialName: string;

  description: string;

  password: string;

  cep: string;

  address:string;

  city: string;

  state: string;

  neighborhood: string;

  region: string;

}
