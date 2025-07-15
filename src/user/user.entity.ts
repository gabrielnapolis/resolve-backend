import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

@Entity()
export  class User {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({
    nullable: true,
  })
  type: UserType;

  @Column({
    nullable: true,
  })

 @Column()
  email: string;

  @Column()
  password: string;
  
  @Column({
    nullable: true,
  })
  facebookId: string;
  
}
export enum UserType {
  CLIENT = 'client',
  CONTRACTOR = 'contractor',
  ADMIN = 'admin',
}
