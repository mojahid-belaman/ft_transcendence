import React, { useRef, useEffect, useState } from "react";
import { GameOver } from "./GameOver";
import { Data, StateGame, UserInGame } from "../Library/Data";
import { drawGame } from "../Library/DrawShapes";
import { GameObj } from "../Library/gameObject";
import style from "../styles/Game.module.css";
import socket from "../Library/Socket";
import { Loading } from "@nextui-org/react";
import Image from "next/image";

interface GameProps {
  data: Data;
  currentState?: StateGame;
  setCurrentState: (state: StateGame) => void;
}

export function Game(props: GameProps) {
  const { data, currentState, setCurrentState } = props;

  const canvasRef: any = useRef();
  const initialState: GameObj = {
    ball: {
      ball_x: data.get_Ball_X(),
      ball_y: data.get_Ball_Y(),
    },
    paddle: {
      paddle_left: data.get_PddleLeft_Y(),
      paddle_right: data.get_PddleRight_Y(),
    },
    score: {
      playerOne_Score: data.get_Score_One(),
      playerTwo_Score: data.get_Score_Two(),
    },
    currentState: data.get_State(),
    isWin: data.get_Winner(),
  };

  const [gameState, setGameState] = useState(initialState);

  const [changeData, setChangeData] = useState([
    data.get_Width(),
    data.get_Height(),
  ]);

  function responseGame() {
      if (data.get_TypeRes() !== 1 && window.innerWidth > 1200) {
        data.set_Width(1200);
        data.set_Height(600);
        data.set_Trace_X(data.get_Width());
        data.set_Paddle_Height(data.get_Height());
        data.set_Right_Pddle_X(data.get_Width());
        data.set_PddleLeft_Y(
          data.get_Height() / 2 - data.get_Paddle_Height() / 2
        );
        data.set_PddleRight_Y(
          data.get_Height() / 2 - data.get_Paddle_Height() / 2
        );
        data.set_Ball_X(data.get_Width() / 2);
        data.set_Ball_Y(data.get_Height() / 2);
        data.set_TypeRes(1);
        socket.emit("resize", data);
      } else if (
        data.get_TypeRes() !== 2 &&
        window.innerWidth > 800 &&
        window.innerWidth <= 1200
      ) {
        data.set_Width(900);
        data.set_Height(450);
        data.set_Trace_X(data.get_Width());
        data.set_Paddle_Height(data.get_Height());
        data.set_Right_Pddle_X(data.get_Width());
        data.set_PddleLeft_Y(
          data.get_Height() / 2 - data.get_Paddle_Height() / 2
        );
        data.set_PddleRight_Y(
          data.get_Height() / 2 - data.get_Paddle_Height() / 2
        );
        data.set_Ball_X(data.get_Width() / 2 / 1.5);
        data.set_Ball_Y(data.get_Height() / 2 / 1.5);
        data.set_TypeRes(2);
        // socket.emit("resize", data);
      } else if (data.get_TypeRes() !== 4 && window.innerWidth <= 900) {
        data.set_Width(450);
        data.set_Height(225);
        data.set_Trace_X(data.get_Width());
        data.set_Paddle_Height(data.get_Height());
        data.set_Right_Pddle_X(data.get_Width());
        data.set_PddleLeft_Y(
          data.get_Height() / 2 - data.get_Paddle_Height() / 2
        );
        data.set_PddleRight_Y(
          data.get_Height() / 2 - data.get_Paddle_Height() / 2
        );
        data.set_Ball_X(data.get_Width() / 2);
        data.set_Ball_Y(data.get_Height() / 2);
        data.set_TypeRes(0);
        // socket.emit("resize", data);
    }
    setChangeData([data.get_Width(), data.get_Height()]);
  }
  useEffect(() => {
    //NOTE - Declare Variable "canvas" and Assign Reference from JSX
    const canvas: any = canvasRef.current;

    //NOTE - To get the canvas' 2D rendering context
    if (canvas !== undefined) {
      const context = canvas.getContext("2d");

      drawGame(context, data);
    }
  }, [changeData]);

  useEffect(() => {
    window.addEventListener("resize", responseGame);
  }, []);

  useEffect(() => {
    //NOTE - Declare Variable "canvas" and Assign Reference from JSX
    const canvas: any = canvasRef.current;
    if (canvas !== undefined) {
      //NOTE - To get the canvas' 2D rendering context
      const context = canvas.getContext("2d");

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
      if (data.get_State() === StateGame.OVER) setCurrentState(StateGame.OVER);

      socket.on("gameState", (newState: any) => {
        setGameState(newState);
      });
    }

    return () => {
      socket.off("gameState");
    };
  }, [gameState, currentState]);

  useEffect(() => {
    //NOTE - the document is undefined. I should be able to use it inside useEffect
    document.addEventListener("keydown", (e) => {
      if (e.code === "ArrowUp") {
        socket.emit("upPaddle", "down");
      } else if (e.code === "ArrowDown") {
        socket.emit("downPaddle", "down");
      }
    });
    document.addEventListener("keyup", (e) => {
      if (e.code === "ArrowUp") {
        socket.emit("upPaddle", "up");
      } else if (e.code === "ArrowDown") {
        socket.emit("downPaddle", "up");
      }
    });

    responseGame();
  }, []);

  return (
    <>
      {currentState === StateGame.WAIT ? (
        <div className={style.container}>
          <h1>LOADING</h1>
          <Loading
            className={style.load}
            color="white"
            type="spinner"
            size="xl"
          />
        </div>
      ) : (
        <div className={style.container}>
          <div className={style.info}>
            <h1>Players: &uarr; &darr;</h1>
          </div>
          <canvas
            className={style.myCanvas}
            width={data.get_Width()}
            height={data.get_Height()}
            ref={canvasRef}
          ></canvas>
          <div className={style.users}>
            <div>
              {/* <Image
                src={data.get_userOne().avatar}
                alt="Picture of the author"
                width={500}
                height={500}
              /> */}
              {data.get_userOne().username}
            </div>
            <div>
              {/* <Image
                src={data.get_userTwo().avatar}
                alt="Picture of the author"
                width={500}
                height={500}
              /> */}
              {data.get_userTwo().username}
            </div>
          </div>
        </div>
      )}
      {currentState === StateGame.OVER && <GameOver curData={data} />}
    </>
  );
}

export default Game;
