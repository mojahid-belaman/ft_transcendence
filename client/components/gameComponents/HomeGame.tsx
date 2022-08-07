import { useEffect, useState } from "react";
import styles from "../gameComponents/gameStyle/HomeGame.module.css";
import Game from "./Game";
import Cookies from "js-cookie";
import socket from "../Library/Socket";
import { Data } from "../Library/Data";
import Setting from "./Setting";
import axios from "axios";
import ParticleBackground from "./ParticleBackground";
import { useRouter } from "next/router";

//NOTE - Initiale data and Information about all Game like (ball, paddle, score, width, height, canvas)
let data: Data;
if (socket.io.opts.query)
  data = socket.io.opts.query.data;

export function HomeGame() {
  const [isGame, setIsGame] = useState(false);
  const [isSetting, setSetting] = useState(true);
  const [currentState, setCurrentState] = useState(data.get_State());
  const history = useRouter();

  const handleGame = async () => {
    setCurrentState(0)
    const token = Cookies.get("access_token");
    await axios.get('http://localhost:5000/users/me',{
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((res) => {
      socket.emit("join_match", {
        user: res.data
        
      })
      
      socket.on("Playing", (payload: any) => {
        if (payload.playing) {
          data.set_userOne(payload.first);
          data.set_userTwo(payload.second);
          data.set_State(1);
        }
        setCurrentState(1);
      });
    }
    );
    setIsGame(true);
  };

  useEffect(() => {
    console.log("currentState: ", currentState);
      
  }, [currentState])

  const handleSetting = () => {
    setSetting(false);
  };


  useEffect(() => {

  }, [currentState, isGame]);

  return (
    <>
      {!isSetting ? <Setting setSetting={setSetting}/> : 
      (!isGame ? (
        <div className={styles.container}>
            <div className={styles.game}>
              <img src="/pingpong.png" alt="Ping Pong Game" />
            </div>
          <div className={styles.about}>
            <div>
              <h1>
                Ping
                <img
                  src="/racket.png"
                  alt="racket"
                  width="80px"
                  height="60px"
                />
                Pong
              </h1>
              <p>
                PING PONG is a table
                tennis game where you can enjoy a real match experience.
                <br />
                You can enjoy the feeling of an actual table tennis by tossing
                and serving the ball, and hitting back to a different direction
                by adjusting the angle of the racket.
                <br />
                You can discorver it by yourself &nbsp;
                <span className={styles.emoji}>😉</span>
              </p>
              <div className={styles.btn}>
                <button className={styles.btnDef} onClick={handleGame}>
                  PLAY
                </button>
                <button className={styles.btnDef} onClick={handleSetting}>
                  SETTING
                </button>
                <button className={styles.btnDef} onClick={() => history.push("/home")}>
                  HOME
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Game
          data={data}
          currentState={currentState}
          setCurrentState={setCurrentState}
          setIsGame={setIsGame}
        />
      ))}
    </>
  );
}
