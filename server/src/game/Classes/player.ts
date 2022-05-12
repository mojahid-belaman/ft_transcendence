import {Socket} from 'socket.io'
import {Paddle} from './paddle'
import {GameVariable} from './constant'

export class Player {
    private _socket: Socket;
    private _score: number;
    private _paddle: Paddle;
    private _isLesftSide: boolean;
    private _isInterval: NodeJS.Timer;

    constructor(socket: Socket, isLeftSide: boolean) {
        this._socket = socket;
        this._score = 0;
        this._isLesftSide = isLeftSide;
        if (isLeftSide) {
            console.log(`player one take paddle left`)
            this._paddle = new Paddle(GameVariable._left_Paddle_X);
        }
        else {
            console.log(`player two take paddle right`)
            this._paddle = new Paddle(GameVariable._right_Paddle_X);
        }
        this._isInterval = setInterval(() => {this._paddle.movePaddle()}, 1000/60);
    }

    public getSocket(): Socket {
        return this._socket;
    }
    public getPaddle(): Paddle {
        return this._paddle;
    }
    public getScore(): number {
        return this._score;
    }
    public setScore(score: number): number {
        return this._score += score;
    }
}