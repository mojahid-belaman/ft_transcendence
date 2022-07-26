import React, { useState } from "react";
import { HomeGame } from "../../components/HomeGame";
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
