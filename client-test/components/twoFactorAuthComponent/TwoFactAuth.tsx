import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useState } from 'react';
import styles from './twoFactAuth.module.css';

function TwoFactAuth() {
  const [code, setCode] = useState('');
  const accesToken = Cookies.get('access_token');

  const handleCode = (e: any) => {
    e.preventDefault();
    setCode(e.target.value);
  };

  const handleCodeClick = async (e: any) => {
    e.preventDefault();
    const test = await axios.post(
      'http://localhost:5000/twofactorAuth/turnOn',
      { code },
      {
        headers: { Authorization: `Bearer ${accesToken}` },
      }
    );
    console.log('this is test', test);
  };

  return (
    <>
      <div className={styles.box}>
        <div className={styles.container}>
          <input
            placeholder="What's your secret"
            className={styles.twofactAuthInput}
            onChange={handleCode}
          ></input>
          <button onClick={handleCodeClick} className={styles.twofactAuthBtn}>
            Send
          </button>
        </div>
      </div>
    </>
  );
}

export default TwoFactAuth;
