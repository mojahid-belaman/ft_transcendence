import { Users } from 'src/users/entity/users.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

/* export enum GameStatus {
  PENDING = 'Pending',
  STARTED = 'Started',
  ENDED = 'Ended',
}
 */
@Entity()
export class Games {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // @ManyToOne((type) => Users, (user) => user.id, { onUpdate: 'CASCADE' })
  @Column()
  firstPlayer: string;

  // @ManyToOne((type) => Users, (user) => user.id, { onUpdate: 'CASCADE' })
  @Column()
  secondPlayer: string;

  @Column()
  scoreFirst: number;

  @Column()
  scoreSecond: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  date: Date;

  /*  @Column({
    type: 'enum',
    enum: GameStatus,
    default: GameStatus.PENDING,
  })
  gameStatus: GameStatus; */
}
