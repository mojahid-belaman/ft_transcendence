import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum Role {
    ADMIN = "admin",
    USER = "user",
}

@Entity()
export class Users {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column({default: null, unique: true})
    login: string;

    @Column({ default: null })
    email: string;

    @Column({default: ""})
    username: string;
    
    @Column({ default: null })
    lastConnected: Date;
    
    @Column({ default: null })
    avatar: string;
    
    @Column({default: false})
    changedAvatar: boolean;
  
    @Column({default: false})
    isTwoFactorAuthEnabled: boolean;
  
    @Column()
    twoFactorAuthenticationSecret: string;
}