import {Player} from './player'
import {Ball} from './ball'

export class Game {

    private _id_Game: string;
    private _player_One: Player;
    private _player_Two: Player;
    private _ball: Ball;

    constructor(player_One: Player, player_Two: Player) {
        this._id_Game = this.generateId();
        this._player_One = player_One;
        this._player_Two = player_Two;
        this._ball = new Ball();
        setInterval(() => {this.playGame()}, 60);
        // this.playGame(); 
    }

    private generateId(): string {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }

    public playGame(): void {
        this._ball.moveBall();
        this._ball.detectCollision();
        this._player_One.getSocket().emit('moveBall', {x:this._ball.getBall_X(), y:this._ball.getBall_Y()});
        this._player_Two.getSocket().emit('moveBall', {x:this._ball.getBall_X(), y:this._ball.getBall_Y()});
    }
}