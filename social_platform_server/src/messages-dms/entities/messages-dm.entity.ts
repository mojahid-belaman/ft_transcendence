import { Channels } from "src/channels/entity/channels.entity";
import { Users } from "src/users/entity/users.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class MessagesDM{
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @ManyToOne(type => Users, user => user.id)
    first: Users;
    @ManyToOne(type => Users, user => user.id)
    second: Users;
    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    info: Date;
    @Column()
    content: string;
}
