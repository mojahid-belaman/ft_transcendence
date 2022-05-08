import React, { useRef, useEffect, useState } from 'react'
import { Data } from "../Library/Data";
import { drawGame } from "../Library/DrawShapes";
import style from '../styles/Game.module.css'
import {io} from 'socket.io-client'

export function Game() {
  
  const data = new Data();
  const canvasRef: any =  useRef();
  const socket = io('localhost:5001');
  
  const initialState = {
    ball: {
      ball_x: data.get_Ball_X(),
      ball_y: data.get_Ball_Y()
    },
    paddle: {
      paddle_left: data.get_Pddle_Y(),
      paddle_right: data.get_Pddle_Y()
    },
    score: {
      playerOne_Score: data.get_Score_One(),
      playerTwo_Score: data.get_Score_Two()
    }
  }

  const [gmaeState, setGameState] = useState(initialState);


  socket.on('gameState', (newState: any) => {
    setGameState(newState);
  })

  useEffect(() => {
    
        const canvas:any = canvasRef.current;
        const context = canvas.getContext('2d');
    
        //NOTE - Movements, Collision detection, Score Update
        drawGame(context, data);
        //NOTE - the document is undefined. I should be able to use it inside useEffect
        document.addEventListener('keydown', (e) => {
          if (e.code === 'ArrowUp')
            socket.emit('upPaddle');
          else if (e.code === 'ArrowDown')
            socket.emit('downPaddle');
        });

        // window.addEventListener('load', () => {
        //     console.log('onload');
        //     socket.emit('join_match');
        // })
        
  }, [gmaeState]);
    
    return (
        <div className={style.container}>
            <canvas width="800" height="400" ref={canvasRef}></canvas>
        </div>
    )
}

export default Game
