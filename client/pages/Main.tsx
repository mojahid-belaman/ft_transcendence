import React, { useEffect } from "react";
import { Route, Switch, useHistory, Redirect } from "react-router-dom";
import PingPong from "./game/PingPong";
import LiveHome from "./liveGame/LiveHome";
import socket from "../Library/Socket";

export default function Main() {
  useEffect(() => {
    socket.emit("send_games");
    return () => {};
  }, [socket]);

  return (
    <Switch>
      <Route path="/game">
        <PingPong socket={socket} />
      </Route>
      <Route exact path="/liveGame">
        <LiveHome socket={socket} />
      </Route>
      <Redirect from="/" to="liveGame" />
    </Switch>
  );
}
