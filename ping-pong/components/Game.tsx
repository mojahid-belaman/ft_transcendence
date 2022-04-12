import React, { useRef, useEffect, useState, RefObject } from 'react'
import { update } from "./updateMov";
import { drawGame } from "./DrawShapes";
import { userOne, userTwo } from "./Data";
import style from '../styles/Game.module.css'


export function Game() {
  
  const canvasRef: any =  React.createRef();
  let context: any;
  let cWidth: number;
  let cHeight: number;
  let upPressedOne = false;
  let downPressedOne = false;
  let upPressedTwo = false;
  let downPressedTwo = false;
  
  const [isCheck, setCheck] = useState(false);
  
  useEffect(() => {
    
        const canvas:any = canvasRef.current;
        context = canvas.getContext('2d');
        cWidth = canvas.width;
        cHeight = canvas.height;
    
        const render = () => {
          if (isCheck)
          {
            //NOTE - Movements, Collision detection, Score Update
            update(cWidth, cHeight);
            drawGame(context, cWidth, cHeight);
            if (upPressedOne && userOne.y > 10) {
              userOne.y -=10;
            }
            if (downPressedOne && userOne.height + userOne.y < cHeight - 10) {
              userOne.y +=10;
            }
            if (upPressedTwo && userTwo.y > 10) {
              userTwo.y -=10;
            }
            if (downPressedTwo && userTwo.height + userTwo.y < cHeight - 10) {
              userTwo.y +=10;
            }
          }
          else {
            drawGame(context, cWidth, cHeight);
          }
    
          //NOTE - Call function render(); 60 times every 1000ms = 1sec
          requestAnimationFrame(render);
        }
        
        render();
    
        canvas.addEventListener('click', () => {
          setCheck(true);
        })

        //NOTE - the document is undefined. I should be able to use it inside useEffect
        document.addEventListener('keyup', keyUpHandler);
        document.addEventListener('keydown', keyDownHandler);
        
      }, [isCheck]);
      
    
      function keyDownHandler(e:any) {
        if(e.key == "w") {
            upPressedOne = true;
        }
        else if(e.key == "s") {
            downPressedOne = true
        }
        else if(e.key == "ArrowUp") {
            upPressedTwo = true
        }
        else if(e.key == "ArrowDown") {
            downPressedTwo = true
        }
      }
      function keyUpHandler(e:any) {
        if(e.key == "w") {
          upPressedOne = false;
        }
        else if(e.key == "s") {
          downPressedOne = false;
        }
        else if(e.key == "ArrowUp") {
          upPressedTwo = false;
        }
        else if(e.key == "ArrowDown") {
            downPressedTwo = false;
        }
      }
    
    return (
        <div className={style.container}>
            <canvas width="800" height="400" ref={canvasRef}></canvas>
        </div>
    )
}

export default Game
