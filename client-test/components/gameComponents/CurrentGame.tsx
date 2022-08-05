import { useEffect, useState } from "react";
import styles from "../gameComponents/gameStyle/LiveGame.module.css";
import Game from "./Game";

function CurrentGame(props: any) {
  const [check, setCheck] = useState(false);
  // console.log(props.game);
  const hundlGame = () => {
    props.socket.emit("watchers", props.game);
    setCheck(true);
  };
  return (
    <>
      {
        !check ? (<div className={styles.container}>
          <div className={styles.box}>
            <div className={styles.dataOne}>
              <img src={props.game.player_1.avatar} width="100px" height="200px" />
              <span className={styles.username}>
                {props.game.player_1.username}
              </span>
              <span className={styles.score}>{props.game.player_1.score}</span>
            </div>
            <div className={styles.watch}>
              <button onClick={hundlGame}>
                <img src="/eye.png" width="30px" height="60px" />
              </button>
            </div>
            <div className={styles.dataTwo}>
              <img src={props.game.player_2.avatar} width="100px" height="200px" />
              <span className={styles.username}>
                {props.game.player_2.username}
              </span>
              <span className={styles.score}>{props.game.player_2.score}</span>
            </div>
          </div>
        </div>) : <Game />
      }
    </>
  )
}

export default CurrentGame;
