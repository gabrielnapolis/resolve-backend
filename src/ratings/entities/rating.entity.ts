
import { Client } from 'src/client/entities/client.entity';
import { Contractor } from 'src/contractor/entities/contractor.entity';
import { Speciality } from 'src/speciality/entities/speciality.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

export class Rating {
  @PrimaryGeneratedColumn()
  id: string;
 
  @ManyToOne((type) => Contractor)
  contractor: Contractor;

  @ManyToOne((type) =>  Client)
  client: Client

  rate: number;
  comment: string;
}
