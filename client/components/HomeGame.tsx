import styles from "../styles/HomeGame.module.css";

export function HomeGame() {

  return (
    <>
      <div className={styles.container}>
        <div className={styles.game}>
          <img src="/pingpong.png" alt="Ping Pong Game" />
        </div>
        <div className={styles.about}>
          <h1>Ping Pong</h1>
          <p>
            <span>PING PONG</span> is a table tennis game where you can enjoy a
            real match experience.
            <br />
            You can enjoy the feeling of an actual table tennis by tossing and
            serving the ball, and hitting back to a different direction by
            adjusting the angle of the racket.
          </p>
          <div className={styles.center}>
            <button className={styles.btnDef}>
              Default
            </button>
            <button className={styles.btnObs}>
              Obstacle
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
