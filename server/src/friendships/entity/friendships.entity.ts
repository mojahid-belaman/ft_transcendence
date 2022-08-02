import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum FriendshipStatus {
    PENDING = "pending",
    ACCEPTED = "accepted",
    REFUSED = "refused",
    BLOCKED = "blocked"
};

export const noneUser = "00000000-0000-0000-0000-000000000000";

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
    @Column({type: "uuid", default: noneUser})
    blockedBy: string;
}