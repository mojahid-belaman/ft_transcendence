import {Player} from './player'
import {Ball} from './ball'
import { Socket } from 'socket.io';

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

    


    public playGame(player_One: Player, player_Two: Player): void {
        this._ball.moveBall();
        this._ball.direction_Ball(player_One);
        this._ball.direction_Ball(player_Two);
        this._ball.update_score(player_One, player_Two);
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
            }
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
            }
        });

    }

    public get_GamePlayer(player: Socket): Player {
        if (this._player_One.getSocket() === player)
            return this._player_One;
        else if (this._player_Two.getSocket() === player)
            return this._player_Two;
        return null;
    }
}