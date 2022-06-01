import { Conversations } from "src/conversations/entity/conversation.entity";
import { Users } from "src/users/entity/users.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class MessagesDM{
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @ManyToOne(type => Users, user => user.id)
    user: Users;
    @ManyToOne(type => Conversations, conversations => conversations.id)
    conversation: Conversations;
    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    info: Date;
    @Column()
    content: string;
}
