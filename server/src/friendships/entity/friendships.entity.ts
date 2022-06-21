import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum FriendshipStatus {
    PENDING = "pending",
    ACCEPTED = "accepted",
    REFUSED = "refused"
};

@Entity()
export class Friendships {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column({type: "uuid"})
    firstId: string;
    @Column({type: "uuid"})
    secondId: string;
    @Column({
        type: 'enum',
        enum: FriendshipStatus,
        default: FriendshipStatus.PENDING
    })
    status: FriendshipStatus;
    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    date: Date;
}