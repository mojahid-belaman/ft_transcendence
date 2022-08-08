import { IsString, ValidateIf } from "class-validator";
import { UserValidateDTO } from "src/auth/dto";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum Role {
    ADMIN = "admin",
    USER = "user",
}

@Entity()
export class Users {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column({ unique: true})
    login: string;

    @Column({ unique: true })
    email: string;

    @Column({ unique: true })
    username: string;
    
    @Column({ default: null })
    lastConnected: Date;
    
    @Column({ default: null})
    avatar: string;
    
    @Column()
    qrCode: string;
  
    @Column()
    isTwoFactorAuthEnabled: boolean;
  
    @Column()
    twoFactorAuthenticationSecret: string;
}