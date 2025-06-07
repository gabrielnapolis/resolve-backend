import { Speciality } from 'src/speciality/entities/speciality.entity';
import { Contractor } from '../entities/contractor.entity';

export class CreateContractorSpecialityDto {
  contractor: Contractor;

  speciality: Speciality;
}
