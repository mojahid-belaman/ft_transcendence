import React, { useState } from "react";
import Game from "../../components/Game";
import { HomeGame } from "../../components/HomeGame";
import socket from "../../Library/Socket";
import ParticleBackground from "../../components/ParticleBackground";

export function PingPong(props: any) {
  return (
    <>
      <ParticleBackground />
      <HomeGame />
    </>
  );
}

export default PingPong;
