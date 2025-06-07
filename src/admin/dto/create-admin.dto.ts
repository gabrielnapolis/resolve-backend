export class CreateAdminDto {
  id: number;
  username: string;
  password: string;
  email: string;
  firstName?: string;
  lastName?: string;
  isActive?: boolean;
}
