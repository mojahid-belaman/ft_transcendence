
enum State {
    WAIT,
    PLAY,
    OVER
}

export class Data {
    
    //NOTE - Details Canvas
    private cWidth: number;
    private cHeight: number;
    //NOTE - Details Paddle
    private paddleHeight: number;
    private paddleWidth: number;
    private leftPaddle_X: number;
    private leftPaddle_Y: number;
    private rightPaddle_X: number;
    private rightPaddle_Y: number;
    //NOTE - Details Ball
    private ballRadius: number;
    private ball_X: number;
    private ball_Y: number;
    //NOTE - Details Score
    private score_One: number;
    private score_Two: number;
    //NOTE - Details State Game
    private state: number;
    private winner: boolean;
    //NOTE - Details Trace
    private trace_X: number;
    private trace_Y: number;
    private trace_Width: number;
    private trace_Height: number;

    constructor() {
        this.cWidth = 800;
        this.cHeight = 400;
        this.paddleHeight = this.cHeight / 6;
        this.paddleWidth = 10;
        this.leftPaddle_X = 0;
        this.leftPaddle_Y = (this.cHeight/2) - (this.paddleHeight/2);
        this.rightPaddle_X = this.cWidth - this.paddleWidth;
        this.rightPaddle_Y = (this.cHeight/2) - (this.paddleHeight/2);
        this.ballRadius = 10;
        this.ball_X = this.cWidth/2;
        this.ball_Y = this.cHeight/2;
        this.score_One = 0;
        this.score_Two = 0;
        this.state = State.WAIT;
        this.winner = false;
        this.trace_X = this.cWidth/2;
        this.trace_Y = 0;
        this.trace_Width = 2;
        this.trace_Height = 10;
    }

    public get_Width(): number {
        return this.cWidth;
    }
    public get_Height(): number {
        return this.cHeight;
    }
    public get_Paddle_Width(): number {
        return this.paddleWidth;
    }
    public get_Paddle_Height(): number {
        return this.paddleHeight;
    }
    public get_Left_Pddle_X(): number {
        return this.leftPaddle_X;
    }
    public get_Left_Pddle_Y(): number {
        return this.leftPaddle_Y;
    }
    public get_Right_Pddle_X(): number {
        return this.rightPaddle_X;
    }
    public get_Right_Pddle_Y(): number {
        return this.rightPaddle_Y;
    }
    public get_Ball_Radius(): number {
        return this.ballRadius;
    }
    public get_Ball_X(): number {
        return this.ball_X;
    }
    public get_Ball_Y(): number {
        return this.ball_Y;
    }
    public get_Score_One(): number {
        return this.score_One;
    }
    public get_Score_Two(): number {
        return this.score_Two;
    }
    public get_State(): State {
        return this.state;
    }
    public get_Winner(): boolean {
        return this.winner;
    }
    public get_Trace_X(): number {
        return this.trace_X;
    }
    public get_Trace_Y(): number {
        return this.trace_Y;
    }
    public get_Trace_Width(): number {
        return this.trace_Width;
    }
    public get_Trace_Height(): number {
        return this.trace_Height;
    }



}