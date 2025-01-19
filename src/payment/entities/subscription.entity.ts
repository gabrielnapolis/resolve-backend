import { Contractor } from 'src/contractor/entities/contractor.entity';
import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn, ManyToOne } from 'typeorm';
import { Plan } from './plan.entity';

@Entity()
export class Subscription {
    @PrimaryGeneratedColumn()
    id:string

    @Column()
    externalId:string

    @Column()
    externalStatus: string

    @Column()
    nextInvoiceAt: Date

    @ManyToOne((type) => Plan)
    @JoinColumn()
    plan: Plan;

    @ManyToOne((type) => Contractor)
    @JoinColumn()
    contractor: Contractor;

    @Column()
    active:boolean

    @CreateDateColumn()
    createdAt:Date

    @UpdateDateColumn()
    updatedAt:Date
}
