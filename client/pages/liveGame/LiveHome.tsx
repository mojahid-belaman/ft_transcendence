import ParticleBackground from "../../components/ParticleBackground";
import LiveGame from "../../components/LiveGame";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export function LiveHome(props: any) {
  const [games, setGames] = useState([]);
  useEffect(() => {
    props.socket.on("receive_games", (data: any) => {
      const tmp = JSON.parse(data);
      if (tmp.hasOwnProperty("games")) {
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
      {games.map((game, index) => {
        return <LiveGame key={index} game={game}  socket={props.socket}/>;
      })}
      <button>
        <Link to="/game">Play a Game</Link>
      </button>
    </>
  );
}

export default LiveHome;
