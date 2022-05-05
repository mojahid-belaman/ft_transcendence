class Paddle {
    private _paddle_X: number;
    private _paddle_Y: number;
    
    static readonly _canvas_Width = 800;
    static readonly _canvas_Height = 400;
    static readonly _paddle_Width = 10;
    static readonly _paddle_Height = 60;
    static readonly _left_Paddle_X = Paddle._paddle_Width;
    static readonly _right_Paddle_X = Paddle._canvas_Width - Paddle._paddle_Width;

    
    constructor(paddle_X: number) {
        this._paddle_X = paddle_X;
        this._paddle_Y =Paddle._canvas_Height/2 - Paddle._paddle_Height/2;
    }

    public get_PaddleY(): number {
        return this._paddle_Y;
    }

    public get_PaddleX(): number {
        return this._paddle_X;
    }
}