import React, { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

import styles from './settings.module.css';

function SettingsComponent() {
  const [userName, setUserName] = useState('');
  const [avatar, setAvatar] = useState('');
  const [defaultURL, setDefaultURL] = useState();
  const [qrCode, setQrCode] = useState();
  const [is2FA, setIs2FA] = useState(false);
  const accessToken =  Cookies.get('access_token');

  useEffect(() => {
    const responseImage = async () => {
      await axios
        .get('http://localhost:5000/users/me', {
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
        .post('http://localhost:5000/users/upload', formData, {
          headers: { "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${accessToken}` },
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
    
   useEffect(() => {
    const getQrCode = async () => {
      await axios
        .get('http://localhost:5000/2fa/generate', {
          headers: { Authorization: `Bearer ${accessToken}` },
        })
        .then((res) => setQrCode(res.data.qrcode));
    };
    // getQrCode();
    axios.get('http://localhost:5000/users/me',{
      headers: { Authorization: `Bearer ${accessToken}` },
    }).then((res) => {
      console.log(res.data.isTwoFactorAuthEnabled);
      setIs2FA(res.data.isTwoFactorAuthEnabled)
      if (res.data.isTwoFactorAuthEnabled)
        getQrCode();
    })
  }, []);

  const handle2FA = async () => {
    if(!is2FA){
      console.log('this is click')
     axios
     .get(
        'http://localhost:5000/2fa/generate',
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
      console.log('when is2fa is enabled')
      axios.get('http://localhost:5000/2fa/turn-off',
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }).then((res) => setIs2FA(res.data.isTwoFactorAuthEnabled))
    }
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
            placeholder="Enter user name"
            className={styles.userInput}
            onChange={handleUsername}
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