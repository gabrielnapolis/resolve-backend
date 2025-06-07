import { User } from 'src/user/user.entity';
import { Work } from 'src/works/entities/work.entity';
import { PrimaryGeneratedColumn, Column, Entity, OneToMany } from 'typeorm';

@Entity()
export class Client extends User {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  fullname: string;
  @Column({
    nullable: true,
  })
  birthday: string;

  @Column({
    unique: true,
    nullable: true,
  })
  cpf: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column()
  password: string;

  @Column({
    nullable: true,
  })
  state?: string;

  @Column({
    nullable: true,
  })
  city?: string;

  @OneToMany((type) => Work, (work) => work.client)
  works?: Work[];
}
