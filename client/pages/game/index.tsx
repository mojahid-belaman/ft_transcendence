import React, { useState } from "react";
import { HomeGame } from "../../components/gameComponents/HomeGame";
import ParticleBackground from "../../components/gameComponents/ParticleBackground";

export function PingPong(props: any) {
  return (
    <>
    <ParticleBackground />
      <HomeGame />
    </>
  );
}

export default PingPong;
