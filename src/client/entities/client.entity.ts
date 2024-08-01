
import { PrimaryGeneratedColumn, Column, Entity,} from "typeorm"

@Entity()
export class Client {
    
    @PrimaryGeneratedColumn()
    id:string

    @Column()
    fullname:string
    @Column({
      
        nullable: true,
    })
    birthday: string
    
    @Column({
        unique: true,
        nullable: true,
 
    })
    cpf:string
    
    @Column({
        unique: true,
 
    })
    email:string

    @Column()
    password:string

    @Column({
      
        nullable: true,
    })
    state?:string

    @Column({
      
        nullable: true,
    })
    city?:string
}
