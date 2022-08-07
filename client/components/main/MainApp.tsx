import ParticleBackground from "../gameComponents/ParticleBackground";
import ContentCard from "./content/ContentCard";
import classes from "./MainApp.module.css"
import NavigationBar from "./navigationbar/NavigationBar";


function MainApp(props: any){
    return (
        <div className={classes.mainCard}>
            <ParticleBackground/>
            <NavigationBar/>
            <ContentCard children={props.children}/>    
        </div>
    );
}
 
export default MainApp;