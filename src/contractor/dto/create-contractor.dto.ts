import { Speciality } from 'src/speciality/entities/speciality.entity';

export class CreateContractorDto {
  picture: string;

  fullname: string;

  birthday: string;

  cpf: string;

  email: string;

  commercialName: string;

  description: string;

  password: string;

  cep: string;

  address:string;

  state: string;

  city: string;

  neighborhood: string;

  region: string;

  specialities: Speciality[];

  isAdmin: boolean;

  active: boolean;
}
