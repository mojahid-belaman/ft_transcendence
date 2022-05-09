import React, { useRef, useEffect, useState } from 'react'
import { Data } from "../Library/Data";
import { drawGame } from "../Library/DrawShapes";
import style from '../styles/Game.module.css'
import {io} from 'socket.io-client'

const socket = io('localhost:5001');

export function Game() {
  
  const data = new Data();
  const canvasRef: any =  useRef();
  
  
  const initialState = {
    ball: {
      ball_x: data.get_Ball_X(),
      ball_y: data.get_Ball_Y()
    },
    paddle: {
      paddle_left: data.get_PddleLeft_Y(),
      paddle_right: data.get_PddleRight_Y()
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
        data.set_Ball_X(gmaeState.ball.ball_x);
        data.set_Ball_Y(gmaeState.ball.ball_y);

        data.set_PddleLeft_Y(gmaeState.paddle.paddle_left);
        data.set_PddleRight_Y(gmaeState.paddle.paddle_right);

        data.set_Score_One(gmaeState.score.playerOne_Score);
        data.set_Score_Two(gmaeState.score.playerTwo_Score);

        drawGame(context, data);

        window.addEventListener('load', () => {
            socket.emit('join_match');
        })
        
  }, [gmaeState]);

  useEffect(() => {
    //NOTE - the document is undefined. I should be able to use it inside useEffect
    document.addEventListener('keydown', (e) => {
      if (e.code === 'ArrowUp') {
        socket.emit('upPaddle');
        console.log(data.get_PddleRight_Y());
      }
      else if (e.code === 'ArrowDown') {
        socket.emit('downPaddle');
        console.log(data.get_PddleLeft_Y());
      }
    });
  }, []);
    
    return (
        <div className={style.container}>
            <canvas width="800" height="400" ref={canvasRef}></canvas>
        </div>
    )
}

export default Game
