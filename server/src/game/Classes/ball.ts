import { Socket } from 'socket.io';
import {GameVariable} from './constant'
import {Paddle} from './paddle'

export class Ball {
    private _ball_X: number;
    private _ball_Y: number;
    private _ball_DX: number;
    private _ball_DY: number;
    private _collidePoint: number;

    constructor() {
        this._ball_X = GameVariable._canvas_Width/2;
        this._ball_Y = GameVariable._canvas_Height/2;
        this._ball_DX = 3;
        this._ball_DY = 3;
        this._collidePoint = 0;
    }

    public moveBall(): void {
        this._ball_X += this._ball_DX;
        this._ball_Y += this._ball_DY;
        console.log(this._ball_X);
        console.log(this._ball_Y);
        
        if (this._ball_Y + GameVariable._ball_Radius > GameVariable._canvas_Height
            || this._ball_Y - GameVariable._ball_Radius < GameVariable._bounded_PaddleWidth)
            this._ball_DY *= -1;
        
    }

    public detectCollision(): void {
        
        // this._collidePoint = this._ball_Y - (Paddle.get_PaddleY() + GameVariable._paddle_Height/2);

        this._collidePoint  = this._collidePoint / (GameVariable._paddle_Height/2);

        let angleRad: number = (Math.PI / 4) * this._collidePoint;

        let direction: number = (this._ball_X < GameVariable._canvas_Width / 2) ? 1 : -1;

        this._ball_DX = direction * GameVariable._ball_Speed * Math.cos(angleRad);
        this._ball_DY = GameVariable._ball_Speed * Math.sin(angleRad);
    }

    public resetBall(): void {
        this._ball_X = GameVariable._canvas_Width / 2;
        this._ball_Y = GameVariable._canvas_Height / 2;
        this._collidePoint = 0;
    }

    public getBall_X(): number {
        return this._ball_X;
    }

    public getBall_Y(): number {
        return this._ball_Y;
    }
}