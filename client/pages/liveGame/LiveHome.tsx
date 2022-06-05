import ParticleBackground from "../../components/ParticleBackground";
import LiveGame from "../../components/LiveGame";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Data } from "../../Library/Data";
import styles from "../../styles/LiveHome.module.css";

export function LiveHome(props: any) {
  const [games, setGames] = useState([]);
  useEffect(() => {
    props.socket.on("receive_games", (data: any) => {
      const tmp = JSON.parse(data);
      if (tmp.hasOwnProperty("games")) {
        console.log(tmp);
        setGames(tmp.games);
      }
    });
    return () => {
      props.socket.off("receive_games");
    };
  }, [props.socket]);

  return (
    <>
      <ParticleBackground />
      {games.length !== 0 ? (
        games.map((game, index) => {
          return <LiveGame key={index} game={game} socket={props.socket} />;
        })
      ) : (
        <div className={styles.empty}>
          <h1>CURRENT GAMES EMPTY</h1>
        </div>
      )}
      <div className={styles.divBtn}>
        <button className={styles.btn}>
          <Link to="/game" style={{ color: "#FFF", textDecoration: "none" }}>
            Play a Game
          </Link>
        </button>
      </div>
    </>
  );
}

export default LiveHome;
