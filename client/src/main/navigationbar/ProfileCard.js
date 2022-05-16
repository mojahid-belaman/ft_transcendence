
import { useState } from 'react';
import classes from './ProfileCard.module.css'
function ProfileCard() {
    const [isActive,setActive]= useState(false)
    function showCard(){
        if(isActive === false)
        {
            setActive(true);
            document.getElementById(classes.profileCard).style.display = "flex";
        }
        else{
            setActive(false)
            document.getElementById(classes.profileCard).style.display = "none";
        }
    }
    return <div className={classes.setCard}>
        <img alt="" src="https://i.pinimg.com/474x/ec/e2/b0/ece2b0f541d47e4078aef33ffd22777e.jpg"></img>
        <button className={classes.clickButton} onClick={showCard}>
            <div>Soukaina hikma</div>
        <span className={isActive?  classes.closeArrow:classes.openArrow}><i className="fa-solid fa-chevron-down" ></i></span>
        </button>
       
            <div className={classes.card} id={classes.profileCard}>        
            </div>
        
    </div>;
}
export default ProfileCard;