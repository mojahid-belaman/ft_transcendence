import { useState } from "react";
import styles from "../styles/HomeGame.module.css";
import Game from "./Game";
import Cookies from "js-cookie";
import { io } from "socket.io-client";

const socket = io("http://10.12.8.14:5001");

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
            <h1>Ping Pong</h1>
            <p>
              <span>PING PONG</span> is a table tennis game where you can enjoy
              a real match experience.
              <br />
              You can enjoy the feeling of an actual table tennis by tossing and
              serving the ball, and hitting back to a different direction by
              adjusting the angle of the racket.
            </p>
            <div className={styles.center}>
              <button className={styles.btnDef} onClick={gameDefHandler}>
                Default
              </button>
              <button className={styles.btnObs} onClick={gameObsHandler}>Obstacle</button>
            </div>
          </div>
        </div>
      ) : (
        <Game socket={socket} />
      )}
    </>
  );
}
