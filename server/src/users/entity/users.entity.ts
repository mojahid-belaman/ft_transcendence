import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum Role {
    ADMIN = "admin",
    USER = "user",
}

@Entity()
export class Users {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column()
    username: string;
    @Column({ default: "" })
    username42: string;
    @Column()
    password: string;
    @Column({ default: null })
    lastConnected: Date;
    @Column({ default: null })
    avatar: string;
    @Column({
        type: 'enum',
        enum: Role,
        default: Role.USER
    })
    role: Role;
}