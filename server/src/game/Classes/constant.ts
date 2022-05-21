export class GameVariable {
  static _canvas_Width = 1200;
  static _canvas_Height = 600;

  static readonly _paddle_Width = 10;
  static _paddle_Height = GameVariable._canvas_Height / 6;
  static readonly _left_Paddle_X = GameVariable._paddle_Width;
  static _right_Paddle_X =
    GameVariable._canvas_Width - GameVariable._paddle_Width;
  static readonly _paddle_Speed = 10;

  static readonly _bounded_PaddleHeight = 15;
  static readonly _max_Score = 5;

  static readonly _ball_Radius = 9;
  static _ball_Speed = 5;
}
