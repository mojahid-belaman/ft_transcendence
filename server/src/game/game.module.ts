import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/users/entity/users.entity';
import { UsersService } from 'src/users/users.service';
import { Games } from './enitites/game.entity';
import { GameController } from './game.controller';
import { GameGateway } from './game.gateway';
import { GameService } from './game.service';

@Module({
  imports: [TypeOrmModule.forFeature([Games, Users])],
  controllers: [GameController],
  providers: [GameGateway, GameService, UsersService, JwtService],
})
export class GameModule {}
