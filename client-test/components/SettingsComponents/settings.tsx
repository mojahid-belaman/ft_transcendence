import React, { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

import styles from './settings.module.css';
import { resolve } from 'path';

function SettingsComponent() {
  const [userName, setUserName] = useState('');
  const [avatar, setAvatar] = useState('');
  const [defaultURL, setDefaultURL] = useState();
  const [qrCode, setQrCode] = useState();
  const [is2FA, setIs2FA] = useState();
  const accessToken =  Cookies.get('access_token');

  useEffect(() => {
    const responseImage = async () => {
      await axios
        .get('http://localhost:5000/users/me', {
          headers: { Authorization: `Bearer ${accessToken}` },
        })
        .then((resolve) => {
          const staticUrl = resolve.data.changedAvatar
            ? 'http://localhost:5000/' + resolve.data['avatar']
            : resolve.data.avatar;
            setDefaultURL(staticUrl);
            setIs2FA(resolve.data.isTwoFactorAuthEnabled);
        });
      };
      responseImage();
    }, [avatar]);
    
   useEffect(() => {
    const getQrCode = async () => {
      const accessToken = await Cookies.get('access_token');
      await axios
        .get('http://localhost:5000/twofactorAuth/register', {
          headers: { Authorization: `Bearer ${accessToken}` },
        })
        .then((res) => setQrCode(res.data.qrcode));
    };
    getQrCode();
  }, []);

  const updateAvatar = async (event: any) => {
    event.preventDefault();
    const form = new FormData();
    form.append('image', event.target.files[0]);
    await axios
      .post('http://localhost:5000/users/upload', form, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((res) => {
        setAvatar(res.data['avatar']);
      });
  };

  const handleUsername = async (event: any) => {
    event.preventDefault();
    setUserName(event.target.value);
  };

  const updateUserName = async () => {
    axios.post(
      'http://localhost:5000/users/username',
      {
        username: userName,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  };

  const handle2FA = async () => {
    await axios
    .post(
      'http://localhost:5000/twofactorAuth/turnAuthOn',
      {
        is2FA: !is2FA,
      },
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    )
    .then((res) => {
      setIs2FA(res.data.isTwoFactorAuthEnabled);
    });
  };

  return (
    <>
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
            placeholder="Enter userName"
            className={styles.userInput}
            onChange={handleUsername}
          />
          <button className={styles.btnDef} onClick={updateUserName}>
            Edit
          </button>
        </div>
        <div className={styles.twoFactorAuth}>
          <label>ENABLE TWO-FACTOR AUTHENTICATION</label>
          <button className={styles.btnDef} onClick={handle2FA}>
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
