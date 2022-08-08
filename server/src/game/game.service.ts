import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Games } from './enitites/game.entity';
import { AddGameDto } from './dto/add-game.dto';


@Injectable()
export class GameService {
  constructor(
    @InjectRepository(Games)
    private readonly gameRepository: Repository<Games>,
  ) { }

  async insertGame(data: AddGameDto): Promise<Games> {
    return await this.gameRepository.save(data);
  }

  async getHistory(userId: string) {
    return await this.gameRepository.query(`
    SELECT
      player1.username as "firstPlayer",
      player1.avatar as "firstAvatar",
      games."scoreFirst",
      player2.username as "secondPlayer",
      player2.avatar as "secondAvatar",
      games."scoreSecond",
      games.date
    FROM users as player1
    JOIN games as games ON (games."firstPlayer"::text = player1.id::text)
    JOIN users as player2 ON (games."secondPlayer"::text = player2.id::text)
    WHERE player1.id::text = '${userId}' OR player2.id::text = '${userId}'
    `).then(history => {
      if (history)
        return history;
      return [];
    })
  }
}
