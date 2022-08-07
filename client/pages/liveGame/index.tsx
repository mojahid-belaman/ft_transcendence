import { useEffect, useState } from "react";
import styles from "../../components/gameComponents/gameStyle/LiveHome.module.css";
import Link from "next/link";
import socket from "../../components/Library/Socket";
import ParticleBackground from "../../components/gameComponents/ParticleBackground";
import LiveGame from "../../components/gameComponents/LiveGame";

export function LiveHome(props: any) {
  const [games, setGames] = useState([]);
  useEffect(() => {
    socket.on("receive_games", (data: any) => {
      const tmp = JSON.parse(data);
      if (tmp.hasOwnProperty("games")) {
        // console.log(tmp);
        setGames(tmp.games);
      }
    });
    return () => {
      socket.off("receive_games");
    };
  }, [socket]);

  return (
    <>
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
          <Link href="/game">
            <span style={{ color: "#FFF", textDecoration: "none" }}>
              Play a Game
            </span>
          </Link>
        </button>
      </div>
    </>
  );
}

export default LiveHome;
