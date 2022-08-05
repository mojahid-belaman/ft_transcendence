import React, { useState } from "react";
import { HomeGame } from "../../components/gameComponents/HomeGame";
import ParticleBackground from "../../components/gameComponents/ParticleBackground";
import MainApp from "../../components/main/MainApp";

export function PingPong(props: any) {
  return (
    <MainApp>
      <ParticleBackground />
      <HomeGame />
    </MainApp>
  );
}

export default PingPong;
