import ContentCard from "./content/ContentCard";
import classes from "./MainApp.module.css"
import NavigationBar from "./navigationbar/NavigationBar";
function MainApp(){
    return<div className={classes.mainCard}>
        <NavigationBar/>
        <ContentCard/>
        
    </div>
}

export default MainApp;