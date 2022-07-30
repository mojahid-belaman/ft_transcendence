import { useState } from 'react';
import classes from './ProfileModal.module.css'
function GameCard(){
  return(<div className={classes.GamesCard}>
      <img className={classes.GameImage} alt="" src="https://i.pinimg.com/474x/ec/e2/b0/ece2b0f541d47e4078aef33ffd22777e.jpg"></img>
      <div>Game#N </div>
      <div>Score</div>
  </div>)
}

function Game() {
  return (
      <div>
          <hr />
          <div className={classes.Games}>
              <div ><GameCard/></div>
              <div ><GameCard/></div>
              <div ><GameCard/></div>
              <div ><GameCard/></div>
              <div ><GameCard/></div>
              <div ><GameCard/></div>
              <div ><GameCard/></div>
              <div ><GameCard/></div>
              <div ><GameCard/></div>
              <div ><GameCard/></div>
              <div ><GameCard/></div>
              <div ><GameCard/></div>
          </div>
      </div>)
}
function About() {
  return (
      <div>
          <hr />
          <div className={classes.about}>
              <div className={classes.header}>Top Score</div>
              <div className={classes.content}>35 </div>
              <div className={classes.header}>Status</div>
              <div className={classes.content}>Public</div>
              <div className={classes.header}>Number of Members</div>
              <div className={classes.content}>10</div>
          </div>
      </div>)
}
function UserInfo() {
  const [buttons, setButton] = useState(1);
  return (
      <div className={classes.infoCard}>
          <div className={classes.header}>
              <img className={classes.channelImage} src="https://i.pinimg.com/474x/ec/e2/b0/ece2b0f541d47e4078aef33ffd22777e.jpg"></img>
              <div className={classes.channelName}>
                 <p> User Name</p>
                  <div className={classes.buttons}>
                      <button onClick={()=> setButton(1)}>About</button>
                      <button onClick={()=> setButton(2)}>Games</button>
                  </div>
              </div>
          </div>
          {buttons === 1 ? <div><About/></div> : null}
          {buttons === 2 ? <div><Game/></div> : null}
      </div>
  )
}


function ProfileModal(props:any) {
    return <div>
        <div onClick={props.OpenClose} className={classes.backdrop}></div>
        <div className={classes.card}>
          <div onClick={props.OpenClose} className={classes.close}> <i className="fa-solid fa-xmark"></i></div>
          <UserInfo/>
        </div>
    </div>
}
export default ProfileModal;