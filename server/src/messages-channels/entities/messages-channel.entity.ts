import { Channels } from "src/channels/entity/channels.entity";
import { Users } from "src/users/entity/users.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class MessagesChannel {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column()
    userId: string;
    @Column()
    channelId: string;
    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    info: Date;
    @Column()
    content: string;
}
