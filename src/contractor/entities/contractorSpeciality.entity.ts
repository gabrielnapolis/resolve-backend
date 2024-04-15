import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Contractor } from './contractor.entity';
import { Speciality } from 'src/speciality/entities/speciality.entity';

@Entity()
export class ContractorSpeciality {
  @PrimaryGeneratedColumn()
  id: string;
 
  @ManyToOne((type) => Contractor, (job) => job.id)
  contractor: Contractor;

  @ManyToOne((type) => Speciality, (job) => job.id)
  speciality: Speciality;
  
  @Column()
  price: number;
  @Column()
  //tipo de cobrança
  priceType: string;
}
