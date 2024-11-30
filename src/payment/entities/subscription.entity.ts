import { Contractor } from 'src/contractor/entities/contractor.entity';
import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn } from 'typeorm';
import { Plan } from './plan.entity';

@Entity()
export class Subscription {
    @PrimaryGeneratedColumn()
    id:string

    @Column()
    externalId:string

    @Column()
    externalStatus: string

    @OneToOne((type) => Plan)
    @JoinColumn()
    plan: Plan;

    @OneToOne((type) => Contractor)
    @JoinColumn()
    contractor: Contractor;

    @Column()
    active:boolean

    @CreateDateColumn()
    createdAt:Date

    @UpdateDateColumn()
    updatedAt:Date
}
