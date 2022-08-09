import React, { useEffect, useRef } from 'react';
import { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

import styles from './settings.module.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SettingsComponent() {
  const [userName, setUserName] = useState('');
  const [avatar, setAvatar] = useState('');
  const [defaultURL, setDefaultURL] = useState();
  const [qrCode, setQrCode] = useState();
  const [is2FA, setIs2FA] = useState(false);
  const userRef : any = useRef('');
  const accessToken =  Cookies.get('access_token');
  
  useEffect(() => {
    const responseImage = async () => {
      await axios
      .get(`${process.env.BACKEND_URL}/users/me`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((resolve) => {
        const staticUrl = resolve.data.avatar;
        setDefaultURL(staticUrl);
        setIs2FA(resolve.data.isTwoFactorAuthEnabled);
      });
    };
    responseImage();
  }, [avatar]);
  
  const updateAvatar = async (event: any) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('avatar', event.target.files[0]);
    await axios
    .post(`${process.env.BACKEND_URL}/users/upload`, formData, {
      headers: { "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${accessToken}` },
    })
    .then((res) => {
      setAvatar(res.data['avatar']);
    })
    .catch((e) => toast.error('You need to set a valid Image',{autoClose: 1000}));
  };
  
  const updateUserName = async () => {
      await axios.post(
      `${process.env.BACKEND_URL}/users/username`,
      {
        username: userRef.current.value,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
      ).then((res) => {
        if (res.data.status == 400)
          toast.error('You need to set a valid User name',{autoClose: 1000})
        else
          toast.success('successfully changed',{autoClose: 1000})}
        )
      userRef.current.value = '';
    };
    
    useEffect(() => {
      const getQrCode = async () => {
        await axios
        .get(`${process.env.BACKEND_URL}/users/me`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        })
        .then((res) => setQrCode(res.data.qrCode));
      };
      axios.get(`${process.env.BACKEND_URL}/users/me`,{
        headers: { Authorization: `Bearer ${accessToken}` },
      }).then((res) => {
        setIs2FA(res.data.isTwoFactorAuthEnabled)
        if (res.data.isTwoFactorAuthEnabled)
        getQrCode();
      })
    }, []);
    
    const handle2FA = async () => {
      if(!is2FA){
        axios
        .get(
          `${process.env.BACKEND_URL}/2fa/generate`,
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
          )
          .then((res) => {
            setIs2FA(!is2FA);
            setQrCode(res.data.qrcode)
          });
        }
        else{
          axios.get(`${process.env.BACKEND_URL}/2fa/turn-off`,
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }).then((res) => setIs2FA(res.data.isTwoFactorAuthEnabled))
        }
      };
      
      return (
        <>
    <ToastContainer/>
      <div className={styles.setting}>
        <div className={styles.avatar}>
          <div className={styles.fileInput}>
            <input
              type="file"
              id="file"
              className={styles.file}
              onChange={updateAvatar}
            />
            <label htmlFor="file">
              <img
                className={styles.imgAvatar}
                src={defaultURL}
                alt="user avatar"
              />
            </label>
          </div>
        </div>
        <div className={styles.userName}>
          <label>Username</label>
          <input
            type="text"
            placeholder="Enter user name"
            className={styles.userInput}
            ref={userRef}
            />
          <button className={styles.btnedit} onClick={updateUserName}>
            Edit
          </button>
        </div>
        <div className={styles.twoFactorAuth}>
          <label>Enable two factor authentication</label>
          <button className={styles.btnedit} onClick={handle2FA}>
            {is2FA ? 'Disable' : 'Enable'}
          </button>
        </div>
        {is2FA && (
          <div className={styles.qrCode}>
            <p>Scan the QR code on your authenticator </p>
            <img src={qrCode} alt="qrCode" />
          </div>
        )}
      </div>

    </>
  );
}

export default SettingsComponent;
