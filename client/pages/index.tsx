import React from "react";
import Game from "../components/Game";
import { HomeGame } from "../components/HomeGame";
import socket from "../Library/Socket";
import { BrowserRouter } from "react-router-dom";
import ParticleBackground from "../components/ParticleBackground";
import Main from "./Main";

export function LiveGames() {
  // const router = useRouter();
  // useEffect(() => {
  //   router.replace("/");
  // }, []);

  return (
    <BrowserRouter>
      <Main />
    </BrowserRouter>
  );
}

export default LiveGames;
