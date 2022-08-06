import { Users } from 'src/users/entity/users.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

export enum channelStatus {
    PUBLIC = "Public",
    PRIVATE = "Private",
    PROTECTED = "Protected"
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
    @Column({default: null})
    password: string;
    @Column()
    ownerId: string;
    @Column({default: ""})
    description: string;
    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    date: Date;
}