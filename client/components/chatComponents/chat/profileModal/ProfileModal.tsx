import axios from 'axios';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import classes from './ProfileModal.module.css'

/* 
date: "2022-08-08T21:49:14.118Z"
firstAvatar: "https://cdn.intra.42.fr/users/shikma.jpg"
firstPlayer: "Soukaina Hikma"
scoreFirst: 5
scoreSecond: 2
secondAvatar: "https://cdn.intra.42.fr/users/knabouss.jpg"
secondPlayer: "Khaoula Naboussi"
*/

function GameCard(props:any) {
    return (<div className={classes.GamesCard}>
        {/* <img className={classes.GameImage} alt="" src="https://i.pinimg.com/474x/ec/e2/b0/ece2b0f541d47e4078aef33ffd22777e.jpg"></img> */}
        <div>{props.firstPlayer} | {props.scoreFirst} </div>
        <div>vs</div>
        <div>{props.secondPlayer} | {props.scoreSecond} </div>
    </div>)
}

function Game(props: any) {

    const [games, setGames] = useState<any>([]);

    const getGames = async () => {
        const token = Cookies.get("access_token");
        await axios.get(`${process.env.BACKEND_URL}/games/profile_history/${props.user.userId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((res) => {
            setGames(res.data)
        });
    }

    useEffect(() => {
        getGames();
    }, [])


    return games.lenght !==0 ? (
        <div>
            <hr />
            <div className={classes.Games}>
                {games.map((game: any, index: number) => (
                    <div key={index} ><GameCard {...game} /></div>
                ))}
            </div>
        </div>) : <></>
}

/* function About(props:any) {
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
} */

function UserInfo(props: any) {
    const [buttons, setButton] = useState(1);
    return (
        <div className={classes.infoCard}>
            <div className={classes.header}>
                <img className={classes.channelImage} src={props.user.avatar}></img>
                <div className={classes.channelName}>
                    <p>{props.user.name}</p>
                    <div className={classes.buttons}>
                        <button onClick={() => setButton(2)}>Games</button>
                    </div>
                </div>
            </div>
            {buttons === 2 ? <div><Game user={props.user} /></div> : null}
        </div>
    )
}


function ProfileModal(props: any) {
    return <div>
        <div onClick={props.OpenClose} className={classes.backdrop}></div>
        <div className={classes.card}>
            <div onClick={props.OpenClose} className={classes.close}> <i className="fa-solid fa-xmark"></i></div>
            <UserInfo user={props.user} />
        </div>
    </div>
}
export default ProfileModal;