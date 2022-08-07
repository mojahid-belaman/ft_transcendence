
import { useState } from 'react';
import classes from './ProfileCard.module.css'
function ProfileCard() {
    const [isActive,setActive]= useState(false)
    function showCard(){
        if(isActive === false)
            setActive(true);
        else
            setActive(false)
    }
    return <div className={classes.setCard}>
        <img alt="" src="https://i.pinimg.com/474x/ec/e2/b0/ece2b0f541d47e4078aef33ffd22777e.jpg"></img>
        <button className={classes.clickButton} onClick={showCard}>
            <div>Soukaina hikma</div>
        <span className={isActive?  classes.closeArrow:classes.openArrow}><i className="fa-solid fa-chevron-down" ></i></span>
        </button>
       
            { isActive? <div className={classes.card}>
                <div>info</div>
            </div> : null}
        
    </div>;
}
export default ProfileCard;