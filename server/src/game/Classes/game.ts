import {Player} from './player'
import {Ball} from './ball'
import { gameSate } from "./gameState";
import { Socket } from 'socket.io';
import { GameVariable } from './constant';

export class Game {

    private _player_One: Player;
    private _player_Two: Player;
    private _ball: Ball;
    private _myInterval: NodeJS.Timer;

    constructor(player_One: Player, player_Two: Player) {
        this._player_One = player_One;
        this._player_Two = player_Two;
        this._ball = new Ball();
        this._myInterval = setInterval(() => {this.playGame(this._player_One, this._player_Two)}, 1000/60);
    }

    public stopGame(): void {
        clearInterval(this._myInterval);
        this._player_One.stopPaddle();
        this._player_Two.stopPaddle();
    }

    public gameStateFunc(): gameSate {
        if (this._player_One.getScore() === GameVariable._max_Score ||
            this._player_Two.getScore() === GameVariable._max_Score)
            return gameSate.OVER;
        return gameSate.PLAY;
    }


    public playGame(player_One: Player, player_Two: Player): void {
        this._ball.moveBall();
        this._ball.direction_Ball(player_One);
        this._ball.direction_Ball(player_Two);
        this._ball.update_score(player_One, player_Two);
        if (this.gameStateFunc() === gameSate.OVER) {
            this.stopGame();
        }
        this._player_One.getSocket().emit('gameState', {
            ball: {
                ball_x: this._ball.getBall_X(),
                ball_y: this._ball.getBall_Y()
            },
            paddle: {
                paddle_left: this._player_One.getPaddle().get_PaddleY(),
                paddle_right: this._player_Two.getPaddle().get_PaddleY()
            },
            score: {
                playerOne_Score: this._player_One.getScore(),
                playerTwo_Score: this._player_Two.getScore()
            },
            currentState: this.gameStateFunc(),
            isWin: this._player_One.checkWin()
        });
        
        this._player_Two.getSocket().emit('gameState', {
            ball: {
                ball_x: this._ball.getBall_X(),
                ball_y: this._ball.getBall_Y()
            },
            paddle: {
                paddle_left: this._player_One.getPaddle().get_PaddleY(),
                paddle_right: this._player_Two.getPaddle().get_PaddleY()
            },
            score: {
                playerOne_Score: this._player_One.getScore(),
                playerTwo_Score: this._player_Two.getScore()
            },
            currentState: this.gameStateFunc(),
            isWin: this._player_Two.checkWin()
        });

    }

    public get_GamePlayer(player: Socket): Player {
        if (this._player_One.getSocket() === player)
            return this._player_One;
        else if (this._player_Two.getSocket() === player)
            return this._player_Two;
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
}