import { Client } from 'src/client/entities/client.entity';
import { Contractor } from 'src/contractor/entities/contractor.entity';
import { ContractorSpeciality } from 'src/contractor/entities/contractorSpeciality.entity';
import {
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  Entity,
} from 'typeorm';
@Entity()
<<<<<<< HEAD
export class Work { 

=======
export class Work {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({
    nullable: true,
  })
  description: string;

  @Column({
    nullable: true,
  })
  state: string;

  @Column({
    nullable: true,
  })
  city: string;

  @ManyToMany(
    (type) => ContractorSpeciality,
    (speciality) => speciality.contractor,
  )
  specialities: ContractorSpeciality[];

  @ManyToOne((type) => Contractor, (contractor) => contractor.works)
  contractor: Contractor;

  @ManyToOne((type) => Client, (client) => client.works)
  client: Client;
>>>>>>> 2365b36b0b5a00a4802e86e8d54f15f86ce1c762
}
