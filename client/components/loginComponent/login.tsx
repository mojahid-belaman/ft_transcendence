
import styles from './login.module.css';

const LoginComponent = () => {
  return (
    <>
      <div className={styles.card}>
        <div className={styles.contributorBox}>
          <h1>PONG CLASSIC</h1>
          <div className={styles.field}>
            <div className={styles.ping}></div>
            <div className={styles.pad}></div>
            <div className={styles.pong}></div>
            <div className={styles.ball}></div>
          </div>
          <div className={styles.LoginBox}>
            <a className={styles.LoginButton} href="http://localhost:5000/oauth">
              Login With 42
            </a>
          </div>
        </div>
        <div className={styles.img}>
          <h1>TRANSCENDENCE</h1>
          <img src="./pingpong.png" alt="img" width='400' height='600' />
        </div>
      </div>
    </>
  );
};

export default LoginComponent;
