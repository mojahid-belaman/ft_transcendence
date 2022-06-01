import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import ContentCard from "./content/ContentCard";
import classes from "./MainApp.module.css"
import NavigationBar from "./navigationbar/NavigationBar";
function MainApp(props: any){
    const history = useHistory();
    useEffect(() => {
        if (!props.isLoggedIn)
            history.replace('/auth');
    }, [props.isLoggedIn]);
    return<div className={classes.mainCard}>
        <NavigationBar/>
        <ContentCard/>
    </div>
}

export default MainApp;