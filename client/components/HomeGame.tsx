import styles from "../styles/HomeGame.module.css";

export function HomeGame() {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.game}>
            <h1>Left</h1>
        </div>
        <div className={styles.about}>
            <h1>Right</h1>
          <div className={styles.btn}></div>
        </div>
      </div>
    </>
  );
}
