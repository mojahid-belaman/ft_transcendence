import axios from 'axios';
import Cookies from 'js-cookie';
import { useEffect } from 'react';
import styles from './login.module.css';

const LoginComponent = () => {
  // let mount = true;
  // useEffect(() => {
  //   if (mount) {
  //     const accessToken = Cookies.get('access_token');
  //     if (accessToken) {
  //       axios
  //         .get('http://localhost:5000/user', {
  //           headers: {
  //             Authorization: `Bearer ${accessToken}`,
  //           },
  //         })
  //         .then((res) => {
  //           console.log(res.data);
  //         });
  //     }
  //   }
  //   return () => {
  //     mount = false;
  //   };
  // }, []);
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
        </div>
        <div className={styles.LoginBox}>
          <a className={styles.LoginButton} href="http://localhost:5000/oauth">
            Login With 42 Intra
          </a>
        </div>
      </div>
    </>
  );
};

export default LoginComponent;
