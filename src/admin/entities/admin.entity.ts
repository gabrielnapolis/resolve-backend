import { User } from "src/user/user.entity";
import { PrimaryGeneratedColumn, Column, Entity,} from "typeorm"

export class Admin extends User{

    @PrimaryGeneratedColumn()
    id:string

    @Column()
    fullname:string
}
 