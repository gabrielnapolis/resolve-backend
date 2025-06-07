import { UserType } from '../../user/user.entity';

export class CreateClientDto {
  fullname: string;
  email: string;
  password: string;
  birthday: string;
  cpf?: string;
  state?: string;
  city?: string;
  type: UserType = UserType.CLIENT;
  login: string;
}
