//NOTE - Detect Collision Between padelle and Ball
  export function detectCollosion(ball: any, player: any) {
    const p_top:number = player.y;
    const p_bottom:number = player.y + player.height;
    const p_left:number = player.x;
    const p_right:number = player.x + player.width;

    const b_top:number = ball.y - ball.radius;
    const b_bottom:number = ball.y + ball.radius;
    const b_left:number = ball.x - ball.radius;
    const b_right:number = ball.x + ball.radius;

    //NOTE - if all of this are true means there is a collision 
    return (b_right > p_left && b_top < p_bottom &&
            b_left < p_right && b_bottom > p_top);
  }