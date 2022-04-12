import { Channels } from "src/channels/entity/channels.entity";
import { Users } from "src/users/entity/users.entity";
import { Column, Entity, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

export enum connectionStatus {
    MEMBER = "member",
    ADMIN = "admin",
    BLOCKED = "blocked",
}

@Entity()
export class Connection {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @ManyToOne(type => Users, user => user.id)
    user: Users;
    @ManyToOne(type => Channels, channel => channel.id)
    channel: Channels;
    @Column()
    dateCreation: string
    @Column({
        type: "enum",
        enum: connectionStatus,
        default: connectionStatus.MEMBER
    })
    status: connectionStatus;
    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    date: Date;
}
