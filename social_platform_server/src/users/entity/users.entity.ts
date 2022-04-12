import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Users {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column()
    username: string;
    @Column()
    lastConnected: Date;
}