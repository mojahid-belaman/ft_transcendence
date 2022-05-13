import React, { useRef, useEffect, useState } from 'react'
import {GameOver} from '../components/GameOver'
import { Data, StateGame } from "../Library/Data";
import { drawGame } from "../Library/DrawShapes";
import { GameObj } from "../Library/gameObject";
import style from '../styles/Game.module.css'
import {io} from 'socket.io-client'

const socket = io('http://10.12.8.14:5001');
const data = new Data();

export function Game() {
  
  const canvasRef: any =  useRef();
  
  
  const initialState: GameObj = {
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
    },
    currentState: data.get_State(),
    isWin: data.get_Winner()
  }

  const [gameState, setGameState] = useState(initialState);
  const [currentState, setCurrentState] = useState(data.get_State());


  socket.on('gameState', (newState: any) => {
    setGameState(newState);
  })

  useEffect(() => {

        const canvas:any = canvasRef.current;
        const context = canvas.getContext('2d');

        //NOTE - Movement Ball and Paddle, Score Update
        data.set_Ball_X(gameState.ball.ball_x);
        data.set_Ball_Y(gameState.ball.ball_y);

        data.set_PddleLeft_Y(gameState.paddle.paddle_left);
        data.set_PddleRight_Y(gameState.paddle.paddle_right);

        data.set_Score_One(gameState.score.playerOne_Score);
        data.set_Score_Two(gameState.score.playerTwo_Score);

        data.set_State(gameState.currentState),
        data.set_Winner(gameState.isWin)

        drawGame(context, data);
        if (data.get_State() === StateGame.OVER)
          setCurrentState(StateGame.OVER)
        
  }, [gameState]);

  useEffect(() => {
    //NOTE - the document is undefined. I should be able to use it inside useEffect
    document.addEventListener('keydown', (e) => {
      if (e.code === 'ArrowUp') {
        socket.emit('upPaddle', 'down');
      }
      else if (e.code === 'ArrowDown') {
        socket.emit('downPaddle', 'down');
      }
    });
    document.addEventListener('keyup', (e) => {
      if (e.code === 'ArrowUp') {
        socket.emit('upPaddle', 'up');
      }
      else if (e.code === 'ArrowDown') {
        socket.emit('downPaddle', 'up');
      }
    });
    
    window.addEventListener('load', () => {
      socket.emit('join_match');
  })
  }, []);
    
    return (
      <>
        <div className={style.container}>
            <canvas width="800" height="400" ref={canvasRef}></canvas>
        </div>
        {(currentState === StateGame.OVER) && <GameOver curData={data}/>}
        
      </>
    )
}

export default Game
