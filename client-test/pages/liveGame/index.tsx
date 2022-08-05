import LiveGame from "../../components/gameComponents/LiveGame";
import ParticleBackground from "../../components/gameComponents/ParticleBackground";

export function Home(props: any) {
  return (
    <>
      <ParticleBackground />
      <LiveGame />
    </>
  );
}

export default Home;
