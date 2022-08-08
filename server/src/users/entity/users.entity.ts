import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum Role {
    ADMIN = "admin",
    USER = "user",
}

@Entity()
export class Users {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column({ unique: true, default: ""})
    login: string;

    @Column({ unique: true, default: "" })
    email: string;

    @Column({ unique: true, default: ""  })
    username: string;
    
    @Column({ default: null})
    lastConnected: Date;
    
    @Column({ default: null})
    avatar: string;
    
    @Column({default: null} )
    qrCode: string;
  
    @Column({default: false})
    isTwoFactorAuthEnabled: boolean;
  
    @Column({default: ''})
    twoFactorAuthenticationSecret: string;
}