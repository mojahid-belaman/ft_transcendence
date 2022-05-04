import React, { useRef, useEffect } from 'react'
import { Data } from "../Library/Data";
import { drawGame } from "../Library/DrawShapes";
import style from '../styles/Game.module.css'
import {io} from 'socket.io-client'

export function Game() {
  
  const data = new Data();
  const canvasRef: any =  useRef();
  const socket = io('localhost:5001');

  useEffect(() => {
    
        const canvas:any = canvasRef.current;
        const context = canvas.getContext('2d');
    
        const render = () => {

          //NOTE - Movements, Collision detection, Score Update
          drawGame(context, data);
    
          //NOTE - Call function render(); 60 times every 1000ms = 1sec
          requestAnimationFrame(render);
        }
        
        render();

        //NOTE - the document is undefined. I should be able to use it inside useEffect
        document.addEventListener('keyup', () => {

        });
        document.addEventListener('keydown', () => {

        });

        window.addEventListener('load', () => {
            console.log('onload');
            socket.emit('join_match');
        })
        
  }, []);
    
    return (
        <div className={style.container}>
            <canvas width="800" height="400" ref={canvasRef}></canvas>
        </div>
    )
}

export default Game
