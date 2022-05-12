
export enum StateGame {
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
    private rightPaddle_X: number;
    private paddleLeft_Y: number;
    private paddleRight_Y: number;
    private borderHeight: number;
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
        this.rightPaddle_X = this.cWidth - this.paddleWidth;
        this.paddleLeft_Y = (this.cHeight/2) - (this.paddleHeight/2);
        this.paddleRight_Y = (this.cHeight/2) - (this.paddleHeight/2);
        this.borderHeight = 15;
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
    public get_Right_Pddle_X(): number {
        return this.rightPaddle_X;
    }
    public get_PddleLeft_Y(): number {
        return this.paddleLeft_Y;
    }
    public set_PddleLeft_Y(y: number): void {
        this.paddleLeft_Y = y;
    }
    public get_PddleRight_Y(): number {
        return this.paddleRight_Y;
    }
    public set_PddleRight_Y(y: number): void {
        this.paddleRight_Y = y;
    }
    public get_Ball_Radius(): number {
        return this.ballRadius;
    }
    public get_Ball_X(): number {
        return this.ball_X;
    }
    public set_Ball_X(x: number): void {
        this.ball_X = x;
    }
    public get_Ball_Y(): number {
        return this.ball_Y;
    }
    public set_Ball_Y(y: number): void {
        this.ball_Y = y;
    }
    public get_Score_One(): number {
        return this.score_One;
    }
    public set_Score_One(scoreOne: number): void {
        this.score_One = scoreOne;
    }
    public get_Score_Two(): number {
        return this.score_Two;
    }
    public set_Score_Two(scoreTwo: number): void {
        this.score_Two = scoreTwo;
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
    public get_borderHeight(): number {
        return this.borderHeight;
    }
}