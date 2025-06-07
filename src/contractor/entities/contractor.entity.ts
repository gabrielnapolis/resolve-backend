import { PrimaryGeneratedColumn, Column, OneToMany, Entity } from 'typeorm';
import { ContractorSpeciality } from './contractorSpeciality.entity';
import { User } from 'src/user/user.entity';
import { Work } from 'src/works/entities/work.entity';
@Entity()
export class Contractor extends User {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({
    nullable: true,
  })
  picture: string;

  @Column()
  fullname: string;

  @Column({
    nullable: true,
  })
  cpf: string;

  @Column({
    nullable: true,
  })
  email: string;

  @Column({
    nullable: true,
  })
  fone: string;

  @Column({
    nullable: true,
  })
  birthday: string;

  @Column({
    nullable: true,
  })
  commercialName: string;

  @Column({
    nullable: true,
  })
  description: string;

  @Column()
  password: string;

  @Column({
    nullable: true,
  })
  state: string;

  @Column({
    nullable: true,
  })
  cep: string;

  @Column({
    nullable: true,
  })
  address: string;

  @Column({
    nullable: true,
  })
  city: string;

  @Column({
    nullable: true,
  })
  neighborhood: string;

  @Column()
  region: string;

  @Column({
    nullable: true,
  })
  isAdmin: boolean;

  @Column({
    nullable: true,
  })
  active: boolean;

  @Column({
    nullable: true,
  })
  subscriberId: string;

  @Column({
    nullable: true,
  })
  facebookId: string;

  @OneToMany(
    (type) => ContractorSpeciality,
    (speciality) => speciality.contractor,
  )
  specialities: ContractorSpeciality[];

  @OneToMany((type) => Work, (work) => work.contractor)
  works?: Work[];
}
