import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';
@Entity()
export class Speciality {
    @PrimaryGeneratedColumn()
    id:string

    @Column()
    fullname:string
    
    @Column()
    logoPath:string

}
