import { useState } from "react";
import styles from "../styles/HomeGame.module.css";
import Game from "./Game";
import Cookies from "js-cookie";
import socket from "../Library/Socket";


export function HomeGame() {
  const [isGame, setIsGame] = useState(false);
  const gameDefHandler = () => {
    const token = Cookies.get("access_token");
    socket.emit("join_match", {
      access_token: token,
      type: "default",
    });
    setIsGame(!isGame);
  };
  const gameObsHandler = () => {
    const token = Cookies.get("access_token");
    socket.emit("join_match", {
      access_token: token,
      type: "obstacle",
    });
    setIsGame(!isGame);
  };

  return (
    <>
      {!isGame ? (
        <div className={styles.container}>
          <div className={styles.game}>
            <img src="/pingpong.png" alt="Ping Pong Game" />
          </div>
          <div className={styles.about}>
            <h1>Ping<img src="/racket.png" alt="racket" width="80px" height="60px"/>Pong</h1>
            <p>
              <span className={styles.title}>PING PONG</span> is a table tennis
              game where you can enjoy a real match experience.
              <br />
              You can enjoy the feeling of an actual table tennis by tossing and
              serving the ball, and hitting back to a different direction by
              adjusting the angle of the racket.
              <br />
              You can discorver it by yourself &nbsp;
              <span className={styles.emoji}>😉</span>
            </p>
            <div className={styles.centerbtn}>
              <button className={styles.btnDef} onClick={gameDefHandler}>
                MEDIUM 
                <img src="/ball.png" alt="racket" width="60px" height="60px"/>
              </button>
              <button className={styles.btnObs} onClick={gameObsHandler}>
                HARD 
                <img src="/ball.png" alt="racket" width="60px" height="60px"/>
                <img src="/ball.png" alt="racket" width="60px" height="60px"/>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <Game />
      )}
    </>
  );
}
