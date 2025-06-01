import { PrimaryGeneratedColumn, Column, OneToMany, Entity } from 'typeorm';

@Entity()
export class User {

  @PrimaryGeneratedColumn()
  userId: string;

  @Column({
   nullable: true,
  })
  type: UserType;

  @Column({
   nullable: true,
  })
  login: string;

  
}
export enum UserType {
  CLIENT = 'client',
  CONTRACTOR = 'contractor',
  ADMIN = 'admin',
}
