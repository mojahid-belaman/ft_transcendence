import React, { useRef, useEffect, useState } from "react";
// import style from "../../styles/Game.module.css";
import style from "../../../styles/Game.module.css"
import socket from "../../../Library/Socket";
import { Data, StateGame } from "../../../Library/Data";
import { GameObj, userObj } from "../../../Library/gameObject";
import { drawGame, drawUsers } from "../../../Library/DrawShapes";
import { GameOver } from "./GameOver";

//NOTE - Initiale data and Information about all Game like (ball, paddle, score, width, height, canvas)
let data = new Data(1200, 600);

export function Game(props: any) {
  const canvasRef: any = useRef();
  const canvasUser: any = useRef();

  const initialState: GameObj = {
    ball: {
      ball_x: data.get_Ball_X(),
      ball_y: data.get_Ball_Y(),
      ballT_x: data.get_BallT_X(),
      ballT_y: data.get_BallT_Y(),
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

  const initialUser: userObj = {
    infoUser: {
      userOne: data.get_UserOne(),
      userTwo: data.get_UserTwo()
    }
  }

  const [gameState, setGameState] = useState(initialState);
  const [userState, setUserState] = useState(initialUser);
  const [currentState, setCurrentState] = useState(data.get_State());
  const [changeData, setChangeData] = useState([
    data.get_Width(),
    data.get_Height(),
  ]);

  function responseGame() {
    if (
      data.get_State() === StateGame.WAIT ||
      data.get_State() === StateGame.OVER
    ) {
      console.log("WAIT");
      if (data.get_TypeRes() !== 1 && window.innerWidth > 1200) {
        console.log("great than 1200");
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
        data.set_BallT_X(data.get_Width() / 2);
        data.set_BallT_Y(data.get_Height() / 2);
        data.set_TypeRes(1);
        socket.emit("resize", data);
      } else if (
        data.get_TypeRes() !== 2 &&
        window.innerWidth > 800 &&
        window.innerWidth <= 1200
      ) {
        console.log("between 800 and 1200");
        data.set_Width(800);
        data.set_Height(400);
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
        data.set_BallT_X(data.get_Width() / 2);
        data.set_BallT_Y(data.get_Height() / 2);
        data.set_TypeRes(2);
        socket.emit("resize", data);
      } else if (
        data.get_TypeRes() !== 3 &&
        window.innerWidth > 576 &&
        window.innerWidth <= 800
      ) {
        console.log("between 576 and 600");
        data.set_Width(600);
        data.set_Height(400);
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
        data.set_BallT_X(data.get_Width() / 2);
        data.set_BallT_Y(data.get_Height() / 2);
        data.set_TypeRes(3);
        socket.emit("resize", data);
      } else if (data.get_TypeRes() !== 4 && window.innerWidth <= 576) {
        console.log("less than 576");
        data.set_Width(450);
        data.set_Height(350);
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
        data.set_BallT_X(data.get_Width() / 2);
        data.set_BallT_Y(data.get_Height() / 2);
        data.set_TypeRes(0);
        socket.emit("resize", data);
      }
    } else if (data.get_State() === StateGame.PLAY) {
      console.log("PLAY");
    }
    setChangeData([data.get_Width(), data.get_Height()]);
  }
  useEffect(() => {
    console.log("useEffect dependencie Injection Size");
    //NOTE - Declare Variable "canvas" and Assign Reference from JSX
    const canvas: any = canvasRef.current;
    const canvasTwo: any = canvasUser.current;

    //NOTE - To get the canvas' 2D rendering context
    const context = canvas.getContext("2d");
    const contextTwo = canvasTwo.getContext("2d");

    drawGame(context, data);
    drawUsers(contextTwo, data);
  }, [changeData]);

  useEffect(() => {
    console.log("useEffect run one time about ressize");
    window.addEventListener("resize", responseGame);
  }, []);

  useEffect(() => {
    console.log("useEffect dependencie Injection gameState");
    //NOTE - Declare Variable "canvas" and Assign Reference from JSX
    const canvas: any = canvasRef.current;
    

    //NOTE - To get the canvas' 2D rendering context
    const context = canvas.getContext("2d");

    //NOTE - Movement Ball
    data.set_Ball_X(gameState.ball.ball_x);
    data.set_Ball_Y(gameState.ball.ball_y);
    data.set_BallT_X(gameState.ball.ballT_x);
    data.set_BallT_Y(gameState.ball.ballT_y);
    
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

    return () => {
      socket.off("gameState");
    };
  }, [gameState]);

  useEffect(() => {
    console.log("useEffect dependency userState")
    const canvas: any = canvasUser.current;
    const contextData = canvas.getContext("2d");

    data.set_UserOne(userState.infoUser.userOne);
    data.set_UserTwo(userState.infoUser.userTwo);

    //NOTE - Display Users
    drawUsers(contextData, data);
    
    socket.on("userState", (newState: any) => {
      console.log(newState);
      setUserState(newState);
    })

    return () => {
      socket.off("userState");
    }
  }, [userState])

  useEffect(() => {
    console.log("useEffect run one time about keys and load");
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
        <canvas className={style.myCanvas} width={data.get_Width()} height={data.get_CanvasUserH()} ref={canvasUser}></canvas>
      </div>
      {currentState === StateGame.OVER && <GameOver curData={data} />}
    </>
  );
}

export default Game;
