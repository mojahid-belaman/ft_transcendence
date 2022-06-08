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
    @Column()
    firstId: string;
    @Column()
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