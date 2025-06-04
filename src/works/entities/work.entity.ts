import { Client } from "src/client/entities/client.entity";
import { Contractor } from "src/contractor/entities/contractor.entity";
import { ContractorSpeciality } from "src/contractor/entities/contractorSpeciality.entity";
import { PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, ManyToMany, Entity } from "typeorm";
@Entity()
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
  state:string;

  @Column({
    nullable: true,
  })
  city: string;

  @ManyToMany(
    (type) => ContractorSpeciality,
    (speciality) => speciality.contractor,
  )
  specialities: ContractorSpeciality[];


    @ManyToOne(
    (type) => Contractor,
    (contractor) => contractor.works, // Assuming Contractor has a 'works' property 
  )
  contractor: Contractor;

     @ManyToOne(
    (type) => Client,
    (client) => client.works, // Assuming Client has a 'works' property 
  )
    client: Client;
}
