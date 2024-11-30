import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Plan {
    @PrimaryGeneratedColumn()
    id:string

    @Column()
    external_id:string

    @Column()
    price:number
    
    @Column()
    active:boolean

    @Column()
    description: string

    @CreateDateColumn()
    createdAt:Date

    @UpdateDateColumn()
    updatedAt:Date
}
