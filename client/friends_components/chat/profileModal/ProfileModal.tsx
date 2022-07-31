import axios from 'axios';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import classes from './ProfileModal.module.css'
function GameCard(){
  return(<div className={classes.GamesCard}>
      <img className={classes.GameImage} alt="" src="https://i.pinimg.com/474x/ec/e2/b0/ece2b0f541d47e4078aef33ffd22777e.jpg"></img>
      <div>Game#N </div>
      <div>Score</div>
  </div>)
}

function Game(props: any) {
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
function About(props: any) {
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
function UserInfo(props: any) {
    // props.user.isOnline
    const [buttons, setButton] = useState(1);
    const [username, setUername] = useState("")

    const getUser = async (userId: string) => {
        const token = Cookies.get('access_token');    
        await axios.get(`${process.env.API}/users/${userId}`,{
            headers: {
                Authorization: `Bearer ${token}`,
        } }).then(res => {
            console.log(res.data);
            setUername(res.data.username);
        })
        /* 
            avatar: null
            id: "7093c24d-b9c1-44af-b2e5-6e0d889172ad"
            lastConnected: "2022-07-24T17:00:05.070Z"
            password: "$2b$10$pKXxCOKKFR8bE27dladSrOrcPmyNlo5KRb.kdsd46m3D32cX/za6G"
            role: "user"
            username: "AyoubBoulbaz"
            username42: "aboulbaz2"
        */
    }
    useEffect(() => {
        getUser(props.user.userId)
    }, []);
    return (
        <div className={classes.infoCard}>
            <div className={classes.header}>
                <img className={classes.channelImage} src="https://i.pinimg.com/474x/ec/e2/b0/ece2b0f541d47e4078aef33ffd22777e.jpg"></img>
                <div className={classes.channelName}>
                    <p>{username}</p>
                    <div className={classes.buttons}>
                        <button onClick={()=> setButton(1)}>About</button>
                        <button onClick={()=> setButton(2)}>Games</button>
                    </div>
                </div>
            </div>
            {buttons === 1 ? <div><About userId={props.user.userId} /></div> : null}
            {buttons === 2 ? <div><Game userId={props.user.userId}/></div> : null}
        </div>
    )
}


function ProfileModal(props:any) {
    useEffect(() => {
        console.log(props.user);
    })
    return <div>
        <div onClick={props.OpenClose} className={classes.backdrop}></div>
        <div className={classes.card}>
          <div onClick={props.OpenClose} className={classes.close}> <i className="fa-solid fa-xmark"></i></div>
          <UserInfo user={props.user} />
        </div>
    </div>
}
export default ProfileModal;