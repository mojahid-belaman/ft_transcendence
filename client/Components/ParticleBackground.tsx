import Particles from "react-tsparticles"
import { loadFull } from "tsparticles";
import particlesConfig from "../config/particleConfig";


function ParticleBackground() {
    const particlesInit = async (main: any) => {
        console.log(main);
        await loadFull(main);
      };
      
      const particlesLoaded: any = (container: any) => {
        console.log(container);
      };
  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      loaded={particlesLoaded}
      options={particlesConfig}
    />
  )
}

export default ParticleBackground