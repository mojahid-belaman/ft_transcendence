import React, { useState } from "react";
import Game from "../../components/Game";
import { HomeGame } from "../../components/HomeGame";
import ParticleBackground from "../../components/ParticleBackground";

export function PingPong() {
  return (
    <>
      <ParticleBackground />
      <HomeGame />
    </>
  );
}

export default PingPong;
