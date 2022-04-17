import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Users {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text', {unique: true})
    email: string;

    @Column()
    psw: string;
}