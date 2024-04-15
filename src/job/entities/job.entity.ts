import { Client } from 'src/client/entities/client.entity';
import { Contractor } from 'src/contractor/entities/contractor.entity';
import { Speciality } from 'src/speciality/entities/speciality.entity';
import { PrimaryGeneratedColumn, Column, Entity, ManyToOne } from 'typeorm';

@Entity()
export class Job {
    @PrimaryGeneratedColumn()
    id:string


    
    @ManyToOne((type) => Client, (job) => job.id)
    client: Client

    @Column()
    title:string

    @Column()
    city:string

    @Column()
    neighborhood:string

    @Column()
    region:string

    @Column()
    streetName:string

    @Column()
    duration:number


    @ManyToOne((type) => Contractor, (job) => job.id)
    contractor: Contractor;

    @ManyToOne((type) => Speciality, (job) => job.id)
    speciality: Speciality;

}