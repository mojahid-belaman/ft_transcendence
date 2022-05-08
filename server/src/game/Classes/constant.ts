
export class GameVariable {

    static readonly _canvas_Width = 800;
    static readonly _canvas_Height = 400;

    static readonly _paddle_Width = 10;
    static readonly _paddle_Height = 60;
    static readonly _left_Paddle_X = GameVariable._paddle_Width;
    static readonly _right_Paddle_X = GameVariable._canvas_Width - GameVariable._paddle_Width;

    static readonly _bounded_PaddleWidth = 15;
    static readonly _max_Score = 10;

    static readonly _ball_Radius = 9; 
    static readonly _ball_Speed = 10; 
}