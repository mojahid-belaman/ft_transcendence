import { Player } from './player';
import { Ball } from './ball';
import { gameSate } from './gameState';
import { Socket } from 'socket.io';
import { GameVariable } from './constant';
import { GameService } from '../game.service';
import { AddGameDto } from '../dto/add-game.dto';
import { uuid } from 'uuidv4';

export class Game {
  private _player_One: Player;
  private _player_Two: Player;
  private _ball: Ball;
  private _ballTwo?: Ball;
  private _myInterval: NodeJS.Timer;
  private _gameService: GameService;
  private _typeGame: string;
  private _watchers: Socket[];

  constructor(
    player_One: Player,
    player_Two: Player,
    gameService: GameService,
    typeGame: string,
  ) {
    this._player_One = player_One;
    this._player_Two = player_Two;
    this._ball = new Ball();
    this._gameService = gameService;
    this._typeGame = typeGame;
    if (this._typeGame === 'obstacle') this._ballTwo = new Ball();
    this._myInterval = setInterval(() => {
      this.playGame(this._player_One, this._player_Two);
    }, 1000 / 60);
  }

  public stopGame(): void {
    clearInterval(this._myInterval);
    this._player_One.stopPaddle();
    this._player_Two.stopPaddle();

    const gameDta = new AddGameDto();
    gameDta.firstPlayer = this._player_One.getUserId();
    gameDta.secondPlayer = this._player_Two.getUserId();
    gameDta.scoreFirst = this._player_One.getScore();
    gameDta.scoreSecond = this._player_Two.getScore();
    this._gameService.insertGame(gameDta);
  }

  public gameStateFunc(): gameSate {
    if (
      this._player_One.getScore() === GameVariable._max_Score ||
      this._player_Two.getScore() === GameVariable._max_Score
    )
      return gameSate.OVER;
    return gameSate.PLAY;
  }

  public playGame(player_One: Player, player_Two: Player): void {
    if (this._typeGame === 'obstacle') {
      this._ballTwo.moveBall();
      this._ballTwo.direction_Ball(player_One);
      this._ballTwo.direction_Ball(player_Two);
      this._ballTwo.update_score(player_One, player_Two);
    }
    this._ball.moveBall();
    this._ball.direction_Ball(player_Two);
    this._ball.direction_Ball(player_One);
    this._ball.update_score(player_One, player_Two);
    if (this.gameStateFunc() === gameSate.OVER) {
      this.stopGame();
    }
    this._player_One.getSocket().emit('gameState', {
      ball: {
        ball_x: this._ball.getBall_X(),
        ball_y: this._ball.getBall_Y(),
        ballT_x: this._ballTwo?.getBall_X(),
        ballT_y: this._ballTwo?.getBall_Y(),
      },
      paddle: {
        paddle_left: this._player_One.getPaddle().get_PaddleY(),
        paddle_right: this._player_Two.getPaddle().get_PaddleY(),
      },
      score: {
        playerOne_Score: this._player_One.getScore(),
        playerTwo_Score: this._player_Two.getScore(),
      },
      currentState: this.gameStateFunc(),
      isWin: this._player_One.checkWin(),
    });

    this._player_Two.getSocket().emit('gameState', {
      ball: {
        ball_x: this._ball.getBall_X(),
        ball_y: this._ball.getBall_Y(),
        ballT_x: this._ballTwo?.getBall_X(),
        ballT_y: this._ballTwo?.getBall_Y(),
      },
      paddle: {
        paddle_left: this._player_One.getPaddle().get_PaddleY(),
        paddle_right: this._player_Two.getPaddle().get_PaddleY(),
      },
      score: {
        playerOne_Score: this._player_One.getScore(),
        playerTwo_Score: this._player_Two.getScore(),
      },
      currentState: this.gameStateFunc(),
      isWin: this._player_Two.checkWin(),
    });
  }

  public get_GamePlayer(player: Socket): Player {
    if (this._player_One.getSocket() === player) return this._player_One;
    else if (this._player_Two.getSocket() === player) return this._player_Two;
    return null;
  }

  public get_Ball(): Ball {
    return this._ball;
  }

  public get_PlayerOne(): Player {
    return this._player_One;
  }

  public get_PlayerTwo(): Player {
    return this._player_Two;
  }

  public playerOutGame(client: Socket): void {
    if (this._player_One.getSocket() === client) {
      this._player_One.setScore(GameVariable._max_Score);
      this._player_Two.setScore(0);
      this._player_One.checkWin();
      this._player_Two.checkWin();
    } else if (this._player_Two.getSocket() === client) {
      this._player_Two.setScore(GameVariable._max_Score);
      this._player_One.setScore(0);
      this._player_Two.checkWin();
      this._player_One.checkWin();
    }
    this._player_One.getSocket().emit('gameState', {
      ball: {
        ball_x: this._ball.getBall_X(),
        ball_y: this._ball.getBall_Y(),
      },
      paddle: {
        paddle_left: this._player_One.getPaddle().get_PaddleY(),
        paddle_right: this._player_Two.getPaddle().get_PaddleY(),
      },
      score: {
        playerOne_Score: this._player_One.getScore(),
        playerTwo_Score: this._player_Two.getScore(),
      },
      currentState: this.gameStateFunc(),
      isWin: this._player_One.checkWin(),
    });

    this._player_Two.getSocket().emit('gameState', {
      ball: {
        ball_x: this._ball.getBall_X(),
        ball_y: this._ball.getBall_Y(),
      },
      paddle: {
        paddle_left: this._player_One.getPaddle().get_PaddleY(),
        paddle_right: this._player_Two.getPaddle().get_PaddleY(),
      },
      score: {
        playerOne_Score: this._player_One.getScore(),
        playerTwo_Score: this._player_Two.getScore(),
      },
      currentState: this.gameStateFunc(),
      isWin: this._player_Two.checkWin(),
    });
  }

  public addWatcher(watcher: Socket): void {
    this._watchers.push(watcher);
  }
}
