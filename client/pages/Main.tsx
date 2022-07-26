import React, { useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import PingPong from "./game";
import LiveHome from "./liveGame";
import socket from "../Library/Socket";

export default function Main() {
  useEffect(() => {
    socket.emit("send_games");
  }, [socket]);

  return (
    <Switch>
      <Route path="/game">
        <PingPong socket={socket} />
      </Route>
      <Route exact path="/liveGame">
        <LiveHome socket={socket} />
      </Route>
      <Redirect from="/" to="game" />
    </Switch>
  );
}
