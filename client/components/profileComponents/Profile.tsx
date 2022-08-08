import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import classes from "./Profile.module.css";

function History(props: any) {
  return (
    <div className={classes.boardInfo}>
      <div className={classes.historyCard}>
        <div id={classes.start}>
          <img
            className={classes.userImage}
            src="https://i.pinimg.com/474x/ec/e2/b0/ece2b0f541d47e4078aef33ffd22777e.jpg"
          ></img>
          <h2>{props.firstPlayer}</h2>
        </div>
        <h2>vs</h2>
        <div id={classes.end}>
          <h2>{props.secondPlayer}</h2>
          <img
            className={classes.userImage}
            src="https://i.pinimg.com/474x/ec/e2/b0/ece2b0f541d47e4078aef33ffd22777e.jpg"
          ></img>
        </div>
      </div>
      <hr/>
    </div>
  );
}
function TopTen() {
  return (
    <div className={classes.boardInfo}>
      <div className={classes.historyCard}>
        <div id={classes.start}>
          <img
            className={classes.userImage}
            src="https://i.pinimg.com/474x/ec/e2/b0/ece2b0f541d47e4078aef33ffd22777e.jpg"
          ></img>
          <h2>name</h2>
        </div>
      </div>
      <hr/>
    </div>
  );
}
function DisplayUser(props: any) {
  return (
    <div className={classes.displayUser}>
      <h3>{props.first}</h3>
      <h3>{props.second}</h3>
    </div>
  );
}
function Profile() {
  const accessToken = Cookies.get('access_token');
  const [history, setHistory] = useState<any>([]);
  const [wins, setWins] = useState<number>(0)
  const [losses, setLosses] = useState<number>(0)
  const [imgUrl, setImgUrl] = useState('https://i.pinimg.com/474x/ec/e2/b0/ece2b0f541d47e4078aef33ffd22777e.jpg');
  const [username, setUsermame] = useState('');
  const [login, setLogin] = useState('');
  const fetchImage = async () => {
    const img =  await axios.get(`${process.env.BACKEND_URL}/users/me`,{
      headers : {
        Authorization: `Bearer ${accessToken}`
      }
    }).then((res: any) => {
      setImgUrl(res.data.avatar);
      setUsermame(res.data.username)
      setLogin(res.data.login);
    })
    return img;
  }

  const getHistory = async () => {
    await axios.get(`${process.env.BACKEND_URL}/games/history`,{
      headers : {
        Authorization: `Bearer ${accessToken}`
      }
    }).then((res: any) => {
     setHistory([...res.data])
     res.data.forEach((history: any) => {
      if ((history.firstPlayer === username && history.scoreFirst > history.scoreSecond)
        ||
        (history.secondPlayer === username && history.scoreSecond > history.scoreFirst)
      )
        setWins(wins + 1);
      else
        setLosses(losses + 1);
     })
    })
  }

  useEffect(() =>{
      fetchImage();
      getHistory();
  }, [username, login, imgUrl])

  return (
    <div className={classes.mainProfile}>
      <div className={classes.cardsProfile}>
        <fieldset className={classes.profileInfo}>
          <legend className={classes.legend}>
            <img
              className={classes.image}
              src={imgUrl}
            ></img>
          </legend>
          <div className={classes.info}>
            <div className={classes.displayData}>
              <div className={classes.data}>
                <DisplayUser first="Name:" second={username} />
                <DisplayUser first="Login:" second={login} />
              </div>
              <hr/>
              <div className={classes.data}>
                <DisplayUser first="Wins:" second={wins} />
                <DisplayUser first="Loses:" second={losses} />
              </div>
            </div>
          </div>
        </fieldset>
      </div>
      <fieldset className={classes.cardsBoard}>
        <legend className={classes.legend}>
          <h1>History:</h1>
        </legend>
        {history.map((h: any,index:any) => <History {...h} key={index}/>)}
      </fieldset>
      <fieldset className={classes.cardsBoard}>
        <legend className={classes.legend}>
          <h1>Top 10:</h1>
        </legend>
        <TopTen />
      </fieldset>
    </div>
  );
}

export default Profile;
