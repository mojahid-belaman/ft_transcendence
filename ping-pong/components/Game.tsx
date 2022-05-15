import React, { useRef, useEffect, useState, useLayoutEffect } from 'react'
import {GameOver} from '../components/GameOver'
import { Data, StateGame } from "../library/Data";
import { drawGame } from "../library/DrawShapes";
import { GameObj } from "../library/gameObject";
import style from '../styles/Game.module.css'
import {io} from 'socket.io-client'

const socket = io('http://10.12.8.14:5001');

//NOTE - Initiale data and Information about all Game like (ball, paddle, score, width, height, canvas)
let data = new Data(1200, 600);


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
  const [size, setSize] = useState(data);
  

  socket.on('gameState', (newState: any) => {
    setGameState(newState);
  })

  useEffect(() => {
    
    console.log('dkhal');
    //NOTE - Declare Variable "canvas" and Assign Reference from JSX
    const canvas:any = canvasRef.current;
    
    //NOTE - To get the canvas' 2D rendering context
    const context = canvas.getContext('2d');

    drawGame(context, data);

    window.addEventListener('resize', () => {

      if (window.innerWidth === 1200) {
        console.log('1200px');
        data = new Data(1200, 600);
        setSize(data);
      }
      if (window.innerWidth === 992) {
        console.log('1096px');
        data = new Data(800, 400);
        setSize(data);
      }
      if (window.innerWidth === 576) {
        console.log('1096px');
        data = new Data(500, 300);
        setSize(data);
      }

    })

  }, [size])
  
  useEffect(() => {

        //NOTE - Declare Variable "canvas" and Assign Reference from JSX
        const canvas:any = canvasRef.current;
        
        //NOTE - To get the canvas' 2D rendering context
        const context = canvas.getContext('2d');
        
        //NOTE - Movement Ball
        data.set_Ball_X(gameState.ball.ball_x);
        data.set_Ball_Y(gameState.ball.ball_y);
    
        //NOTE - Movement Paddles
        data.set_PddleLeft_Y(gameState.paddle.paddle_left);
        data.set_PddleRight_Y(gameState.paddle.paddle_right);
        
        //NOTE - Update Scores
        data.set_Score_One(gameState.score.playerOne_Score);
        data.set_Score_Two(gameState.score.playerTwo_Score);

        //NOTE - Update State Game if Wait OR Play OR Over
        data.set_State(gameState.currentState);

        //NOTE - Update Win OR Lose
        data.set_Winner(gameState.isWin);

        //NOTE - Display Game
        drawGame(context, data);
        
        //NOTE - Check State Game if true Display "Game Over"
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
            <div className={style.info}>
              <h1>Players: &uarr; &darr;</h1>
            </div>
            <canvas width={data.get_Width()} height={data.get_Height()} ref={canvasRef}></canvas>
        </div>
        {(currentState === StateGame.OVER) && <GameOver curData={data}/>}
        
      </>
    )
}

export default Game
