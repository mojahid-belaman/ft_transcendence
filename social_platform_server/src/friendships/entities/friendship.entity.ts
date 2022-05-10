import { Users } from "src/users/entity/users.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

export enum friendshipStatus {
    PENDING = "Pending",
    FRIEND = "Friend",
    BLOCKED = "Blocked"
}

@Entity()
export class Friendship {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @ManyToOne(type => Users, user => user.id)
    first: Users;
    @ManyToOne(type => Users, user => user.id)
    second: Users;
    @Column({
        type: 'enum',
        enum: friendshipStatus,
        default: friendshipStatus.PENDING
    })
    status: friendshipStatus;
    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    date: Date
}
