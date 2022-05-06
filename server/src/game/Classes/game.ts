import {Player} from './player'
import {Ball} from './ball'

export class Game {

    private _player_One: Player;
    // private _player_Two: Player;
    private _ball: Ball;

    constructor(player_One: Player /*player_Two: Player*/) {
        this._player_One = player_One;
        // this._player_Two = player_Two;
        this._ball = new Ball();
        setInterval(() => {this.playGame(this._player_One)}, 30);
        // this.playGame(); 
    }

    public playGame(player_One: Player): void {
        this._ball.moveBall();
        this._ball.detectCollision(player_One);
        this._player_One.getSocket().emit('moveBall', {x:this._ball.getBall_X(), y:this._ball.getBall_Y()});
        // this._player_Two.getSocket().emit('moveBall', {x:this._ball.getBall_X(), y:this._ball.getBall_Y()});
    }
}