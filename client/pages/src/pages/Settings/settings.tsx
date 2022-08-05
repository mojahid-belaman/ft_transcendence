import React from 'react';
import { useState } from 'react';

import classes from './settings.module.css';

function Settings() {
  const [image, setImage] = useState({ avatar: 'default-avatar.png' });
  const onDrop = (event: any) => {
    console.log(event.target.files[0]);
    // setImage({ picture : event.target.files[0] });
  };
  return (
    <>
      <div className={classes.escButton}>
      <div className={classes.escOuterButton}>
        <div className={classes.escInnerButton}></div>
        </div>
        <h6>ESC</h6>
      </div>
    <div className={classes.container}>
      <div className={classes.sectionTitle}>User profile</div>
      <div className={classes.sectionContent}>
          <label htmlFor="">User Name</label>
        <div className={classes.userName}>
            <input className={classes.input} type="text" placeholder="Enter your user name" />
            <button>Edit</button>
          </div>
        <div className={classes.Avatar}>
            <label htmlFor="">Avatar</label>
            <input className={classes.input} type="file" name="avatar" onChange={onDrop} accept="png" />
          </div>
        <div className={classes.Bio}>
            About me
            <textarea
              name=""
              id=""
              cols={70}
              rows={4}
            className={classes.textarea}
              placeholder="Neque porro quisquam est qui dolorem ipsum quia dolor sit amet,"
            ></textarea>
          <div className={classes.twoFactorAuth}>
              TWO-FACTOR AUTHENTICATION
              <p>
                Add an extra layer of security to your account by using a
                one-time security code each time you login.
              </p>
              <label htmlFor="">Enable 2FA</label>
            <label className={classes.switch}>
                <input className={classes.input} type="checkbox" />
              <span className={classes.slider}></span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Settings;
