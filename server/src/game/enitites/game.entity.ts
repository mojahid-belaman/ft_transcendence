import { Users } from 'src/users/entity/users.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class Games {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  playerOne: string;

  @Column()
  playerTwo: string;

  @Column()
  scoreOne: number;
  
  @Column()
  scoreTwo: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  date: Date;
  // @ManyToOne((type) => Users, (user) => user.id, { onUpdate: 'CASCADE' })
  // firstPlayer: string;

  // @ManyToOne((type) => Users, (user) => user.id, { onUpdate: 'CASCADE' })
  // secondPlayer: string;

  // @Column()
  // scoreFirst: number;

  // @Column()
  // scoreSecond: number;

}
