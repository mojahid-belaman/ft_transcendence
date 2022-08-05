import LiveGame from "../../components/gameComponents/LiveGame";
import ParticleBackground from "../../components/gameComponents/ParticleBackground";
import MainApp from "../../components/main/MainApp";

export function Home(props: any) {
  return (
    <MainApp>
      <ParticleBackground />
      <LiveGame />
    </MainApp>
  );
}

export default Home;
