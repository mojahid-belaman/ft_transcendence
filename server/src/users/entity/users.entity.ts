import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum Role {
    ADMIN = "admin",
    USER = "user",
}

@Entity()
export class Users {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column({ unique: true })
    login: string;

    @Column({ unique: true })
    email: string;

    @Column({default: ""})
    username: string;
    
    @Column({ default: null })
    lastConnected: Date;
    
    @Column({ default: null })
    avatar: string;
    
    @Column()
    changedAvatar: boolean;
  
    @Column({default: false})
    isTwoFactorAuthEnabled: boolean;
  
    @Column({default: false})
    isTwoFactorAuthenticated: boolean;
  
    @Column({default: ""})
    twoFactorAuthenticationSecret: string;
}