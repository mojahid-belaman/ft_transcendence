import { Channels } from "src/channels/entity/channels.entity";
import { Users } from "src/users/entity/users.entity";
import { Column, Entity, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

export enum connectionStatus {
    MEMBER = "member",
    ADMIN = "admin",
    BLOCKED = "blocked",
    OWNER = "owner"
}

@Entity()
export class Connection {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column()
    userId: string;
    @Column()
    channelId: string;
    @Column({
        type: "enum",
        enum: connectionStatus,
        default: connectionStatus.MEMBER
    })
    status: connectionStatus;
    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    date: Date;
}
