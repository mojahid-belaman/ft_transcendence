import styles from "../styles/LiveGame.module.css";

function LiveGame(props: any) {
  const hundlGame = () => {
    console.log(props.game.gameId);
    props.socket
  }
  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <div className={styles.dataOne}>
          <img src="/noimg.png" width="200px" height="200px" />
          <span className={styles.username}>
            {props.game.player_1.username}
          </span>
          <span className={styles.score}>0</span>
        </div>
        <div className={styles.dataTwo}>
          <span className={styles.username}>
            {props.game.player_2.username}
          </span>
          <span className={styles.score}>0</span>
          <img src="/noimg.png" width="200px" height="200px" />
        </div>
        <div className={styles.watch}>
          <button onClick={hundlGame}
          >Watch Game</button>
        </div>
      </div>
    </div>
  );
}

export default LiveGame;
