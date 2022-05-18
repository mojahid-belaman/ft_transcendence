import {GameVariable} from './constant'
import {Player} from './player'

export class Ball {
    private _ball_X: number;
    private _ball_Y: number;
    private _ball_DX: number;
    private _ball_DY: number;
    private _collidePoint: number;

    constructor() {
        this._ball_X = GameVariable._canvas_Width/2;
        this._ball_Y = GameVariable._canvas_Height/2;
        this._ball_DX = 2;
        this._ball_DY = 2; 
        this._collidePoint = 0;
    }

    public moveBall(): void {
        this._ball_X += this._ball_DX;
        this._ball_Y += this._ball_DY;
        
        if (this._ball_Y + GameVariable._ball_Radius > GameVariable._canvas_Height - GameVariable._bounded_PaddleHeight
            || this._ball_Y - GameVariable._ball_Radius < GameVariable._bounded_PaddleHeight)
            this._ball_DY *= -1;
        
    }

    public detect_Collision(player_One: Player): boolean {
        let paddle_top: number = player_One.getPaddle().get_PaddleY();
        let paddle_bottom: number = player_One.getPaddle().get_PaddleY() + GameVariable._paddle_Height;
        let paddle_left: number = player_One.getPaddle().get_PaddleX();
        let paddle_right: number = player_One.getPaddle().get_PaddleX() + GameVariable._paddle_Width;

        let ball_top: number = this._ball_Y - GameVariable._ball_Radius;
        let ball_bottom: number = this._ball_Y + GameVariable._ball_Radius;
        let ball_left: number = this._ball_X - GameVariable._ball_Radius;
        let ball_right: number = this._ball_X + GameVariable._ball_Radius;

        return (ball_right > paddle_left && ball_top < paddle_bottom && 
                ball_left < paddle_right && ball_bottom > paddle_top);
    }

    public direction_Ball(player_One: Player): void {
        
        if (this.detect_Collision(player_One)) {
            
            this._collidePoint = this._ball_Y - (player_One.getPaddle().get_PaddleY() + GameVariable._paddle_Height/2);
            
            this._collidePoint  = this._collidePoint / (GameVariable._paddle_Height/2);
    
            let angleRad: number = (Math.PI / 4) * this._collidePoint;
    
            let direction: number = (this._ball_X < GameVariable._canvas_Width / 2) ? 1 : -1;
    
            this._ball_DX = direction * GameVariable._ball_Speed * Math.cos(angleRad);
            this._ball_DY = GameVariable._ball_Speed * Math.sin(angleRad);

            GameVariable._ball_Speed += 1;

        }
    }

    public update_score(player_One: Player, player_Two: Player): void {
        if (this._ball_X - GameVariable._ball_Radius < 0) {
            player_One.setScore(1);
            this.resetBall();
        }
        else if (this._ball_X + GameVariable._ball_Radius > GameVariable._canvas_Width) {
            player_Two.setScore(1)
            this.resetBall();
        }
    }

    public resetBall(): void {
        this._ball_X = GameVariable._canvas_Width / 2;
        this._ball_Y = GameVariable._canvas_Height / 2;
        this._collidePoint = 0;
        GameVariable._ball_Speed = 5;
        this._ball_DX = 2;
        this._ball_DY = 2;
    }

    public getBall_X(): number {
        return this._ball_X;
    }

    public getBall_Y(): number {
        return this._ball_Y;
    }
    
    public getBall_DX(): number {
        return this._ball_DX;
    }
    
    public getBall_DY(): number {
        return this._ball_DY;
    }
}