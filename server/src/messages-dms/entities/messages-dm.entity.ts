import { Friendships } from "src/friendships/entity/friendships.entity";
import { Users } from "src/users/entity/users.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class MessagesDM{
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column()
    firstId: string;
    @Column()
    secondId: string;
    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    info: Date;
    @Column()
    content: string;
}
