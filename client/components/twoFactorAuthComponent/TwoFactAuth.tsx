import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import styles from './twoFactAuth.module.css';

function TwoFactAuth() {
  const [code, setCode] = useState('');
  const tempToken = Cookies.get('2fa_token');
  const history = useRouter();

  const handleCode = (e: any) => {
    e.preventDefault();
    setCode(e.target.value);
  };

  const handleCodeClick = async (e: any) => {
    e.preventDefault();
    const turnOn2fa = await axios.post(
      'http://localhost:5000/2fa/turn-on',
      { code },
      {
        headers: { Authorization: `Bearer ${tempToken}` },
      }
    ).then((res) => {
      return res.data
    }).catch((e) => console.log(e))

    if(turnOn2fa){
      const access_token = await axios.post(
        'http://localhost:5000/2fa/authenticate',
        { code },
        {
          headers: { Authorization: `Bearer ${tempToken}` },
        }
      ).then(e => e.data.access_token)
      Cookies.set('access_token', access_token);
      Cookies.remove('2fa_token');
      history.push('/home');

    }
  };

  return (
    <>
      <div className={styles.contributorBox}>
        <h1>Two Factor Authentication</h1>
        <div className={styles.tfaBox}>
        <input
            type="text"
            placeholder="Enter 2fa Password"
            className={styles.userInput}
            onChange={handleCode}
            />
        <button className={styles.LoginButton} onClick={handleCodeClick}>
          Send
        </button>
            </div>
      </div>
  </>
  );
}

export default TwoFactAuth;
