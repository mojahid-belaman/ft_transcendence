import {userOne, userTwo, trace, ball} from './Data';


export function drawGame(context: object, cWidth: number, cHeight: number) {
    drawRect(0, 0, cWidth, cHeight, '#000', context);
    drawBorder(0, 0, cWidth, 0, '#d50000', context);
    drawBorder(0, cHeight, cWidth, cHeight, '#d50000', context); 
    drawTextOne(userOne.score, cWidth / 4, cHeight / 5, '#FFF', context);
    drawTextTwo(userTwo.score, 3*cWidth / 4, cHeight / 5, '#FFF', context);
    drawSeparator(trace.x, trace.y, trace.width, trace.height, '#00c853', context, cHeight);
    drawRect(userOne.x, userOne.y, userOne.width, userOne.height, '#FFF', context);
    drawRect(userTwo.x, userTwo.y, userTwo.width, userTwo.height, '#FFF', context);
    DrawCircle(ball.x, ball.y, ball.radius, '#ffff00', context);
}

function drawRect(x: number, y: number, w: number, h: number, color: string, context:any) {
    context.beginPath();
    context.fillStyle = color;
    context.fillRect(x, y, w, h);
  }

  function DrawCircle(x: number, y: number, r: number, color: string, context: any) {
    context.fillStyle = color;
    context.beginPath();
    context.arc(x, y, r, 0, 2 * Math.PI);
    context.closePath();
    context.fill();
  }

  function drawTextOne(text: number, x: number, y: number, color: string, context: any) {
    context.fillStyle = color;
    context.font = "40px 'Press Start 2P', cursive";
    context.fillText(text, x, y);
  }
  
  // function drawTextGame(text: string, x: number, y: number, color: string, context: any) {
  //   context.fillStyle = color;
  //   context.font = "50px 'Press Start 2P', cursive";
  //   context.fillText(text, x, y);
  // }
  
  function drawBorder(x1: number, y1: number, x2: number, y2: number, color: string, context: any) {

    context.strokeStyle = color;
    context.lineWidth = 15;
    context.beginPath();
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.stroke();
  }

  function drawSeparator(x: number, y: number, w: number, h: number, color: string, context: object, cHeight: number) {
    for (let index = 15; index < cHeight - 15; index+=15) {
        drawRect(x, y + index, w, h, color, context);
    }
  }

  function drawTextTwo(text: number, x: number, y: number, color: string, context: any) {
    context.fillStyle = color;
    context.font = "40px 'Press Start 2P', cursive";
    context.fillText(text, x, y);
  }
