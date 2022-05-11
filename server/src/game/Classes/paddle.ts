import {GameVariable} from './constant'

export class Paddle {
    private _paddle_X: number;
    private _paddle_Y: number;
    private _paddleSpeed: number;
    
    constructor(paddle_X: number) {
        this._paddle_X = paddle_X;
        this._paddle_Y = GameVariable._canvas_Height/2 - GameVariable._paddle_Height/2;
        this._paddleSpeed = 0;
    }

    public get_PaddleY(): number {
        return this._paddle_Y;
    }

    public get_PaddleX(): number {
        return this._paddle_X;
    }

    public movePaddle(): void {
        if (this._paddleSpeed === 0) return;
        this._paddle_Y += this._paddleSpeed;
        console.log(`movePaddle: ${this._paddle_Y}`);
        if (this._paddle_Y < GameVariable._bounded_PaddleWidth) {
            console.log(`less than top canvas`);
            this._paddleSpeed = 0;
            this._paddle_Y = GameVariable._bounded_PaddleWidth;
            return;
        }
        if (this._paddle_Y + GameVariable._paddle_Height > GameVariable._canvas_Height) {
            console.log(`great than bottom canvas`);
            this._paddleSpeed = 0;
            this._paddle_Y = GameVariable._canvas_Height - GameVariable._paddle_Height;
            return;
        }
    }

    public up(key: string): void {
        if (key === 'down') {
            this._paddleSpeed -= GameVariable._paddle_Speed;
        }
        else {
            this._paddleSpeed = 0;
        }
    }
    
    public down(key: string): void {
        if (key === 'down') {
            this._paddleSpeed += GameVariable._paddle_Speed;
        }
        else {
            this._paddleSpeed = 0;
        }
    }
}