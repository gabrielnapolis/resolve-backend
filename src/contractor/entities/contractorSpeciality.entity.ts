import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Contractor } from './contractor.entity';
import { Speciality } from 'src/speciality/entities/speciality.entity';

@Entity()
export class ContractorSpeciality {
  @PrimaryGeneratedColumn()
  id: string;
 
  @ManyToOne((type) => Contractor)
  contractor: Contractor;

  @ManyToOne((type) => Speciality)
  speciality: Speciality;
}
