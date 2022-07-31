import ContentCard from "./content/ContentCard";
import classes from "./MainApp.module.css"
import NavigationBar from "./navigationbar/NavigationBar";
import { SocketContexProvider } from "./navigationbar/data_context/socket-context";
// import ParticleBackground from "../Components/ParticleBackground";



function MainApp(props: any){
    return (
        <div className={classes.mainCard}>
            {/* <ParticleBackground /> */}
            <NavigationBar/>
            <ContentCard children={props.children}/>    
        </div>
    );
}
 
export default MainApp;