import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Games } from './enitites/game.entity';
import { GameGateway } from './game.gateway';
import { GameService } from './game.service';

@Module({
  imports: [TypeOrmModule.forFeature([Games])],
  providers: [GameGateway, GameService],
})
export class GameModule {}
