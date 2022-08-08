import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
    ).then(async (res) => {
      if(res.data.status == 401){
        toast.error('Invalid authentication code',{position: toast.POSITION.TOP_RIGHT, autoClose: 1000})
      }
      else{
        await axios.post(
              'http://localhost:5000/2fa/authenticate',
              { code },
              {
                headers: { Authorization: `Bearer ${tempToken}` },
              }
            ).then(e => {
              Cookies.set('access_token', e.data.access_token)
              Cookies.remove('2fa_token');
              history.push('/home');
            })
      }
    })
  };

  return (
    <>
      <ToastContainer/>
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
