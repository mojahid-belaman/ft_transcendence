import ContentCard from "./content/ContentCard";
import classes from "./MainApp.module.css"
import NavigationBar from "./navigationbar/NavigationBar";
import Particles from "react-tsparticles";
import ParticleBackground from "../../../Components/ParticleBackground";

function MainApp(){
    return (
    <div className={classes.mainCard}>
        <NavigationBar/>
        <ParticleBackground />
        <ContentCard/>    
    </div>
    );
}

export default MainApp;