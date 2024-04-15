import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class JobSpeciality {
  @PrimaryGeneratedColumn()
  jobId: number;
  @Column()
  specialityId: number;
  @Column()
  price: number;
  @Column()
  priceType: string;
  @Column()
  duration: number;
}
