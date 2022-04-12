import { Users } from 'src/users/entity/users.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

export enum channelStatus {
    PUBLIC = "Public",
    PRIVATE = "Private",
    CLOSED = "Closed",
}

@Entity()
export class Channels {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column()
    name: string;
    @Column({
        type: 'enum',
        enum: channelStatus,
        default: channelStatus.PUBLIC
    })
    status: channelStatus;
    @ManyToOne(type => Users, user => user.id)
    ownerId: Users;
}