import ContentCard from "./content/ContentCard";
import classes from "./MainApp.module.css"
import NavigationBar from "./navigationbar/NavigationBar";
import ParticleBackground from "../../../Components/ParticleBackground";
import { SocketContexProvider } from "./navigationbar/data_context/socket-context";


function MainApp(){
    return (
    <SocketContexProvider>
        <div className={classes.mainCard}>
            <NavigationBar/>
            <ParticleBackground />
            <ContentCard/>    
        </div>
    </SocketContexProvider>
    );
}

export default MainApp;