import React, { useState } from "react";
import { HomeGame } from "../../Components/HomeGame";
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
