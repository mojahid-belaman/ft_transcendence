import { Role } from "src/enums/role.enum";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Users {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column()
    username: string;
    @Column()
    password: string;
    @Column({default: null})
    lastConnected: Date;
    @Column({default: null})
    avatar: string;
    @Column({
        type: 'enum',
        enum: Role,
        default: Role.USER
    })
    role: Role;
}