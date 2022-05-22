import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Games } from './enitites/game.entity';

@Injectable()
export class GameService {
  constructor(
    @InjectRepository(Games)
    private readonly gameRepository: Repository<Games>,
  ) {}
  
}
