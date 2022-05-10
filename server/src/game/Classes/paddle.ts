import {GameVariable} from './constant'

export class Paddle {
    private _paddle_X: number;
    private _paddle_Y: number;
    
    constructor(paddle_X: number) {
        this._paddle_X = paddle_X;
        this._paddle_Y = GameVariable._canvas_Height/2 - GameVariable._paddle_Height/2;
    }

    public get_PaddleY(): number {
        return this._paddle_Y;
    }

    public get_PaddleX(): number {
        return this._paddle_X;
    }

    public up(): void {
        if (this._paddle_Y >= GameVariable._bounded_PaddleWidth) {
            this._paddle_Y -= 1 * GameVariable._paddle_Speed;
            console.log(`paddleY up: ${this._paddle_Y}`);
        }
    }
    
    public down(): void {
        if (this._paddle_Y + GameVariable._paddle_Height < GameVariable._canvas_Height - GameVariable._bounded_PaddleWidth) {
            this._paddle_Y += 1 * GameVariable._paddle_Speed;
            console.log(`paddleY down: ${this._paddle_Y}`);
        }
    }
}