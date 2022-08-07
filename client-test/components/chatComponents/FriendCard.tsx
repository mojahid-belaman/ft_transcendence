import { useContext, useEffect } from 'react';
import DataContex from './data_context/data-context';
import classes from './FriendCard.module.css'
function FriendCard(props:any) {
    const dataContextVar = useContext(DataContex);
    function setConversation_(){
        dataContextVar.setConversation(props.user.conversationId);
    }

    return (
        <div className={classes.friendButton} onClick={setConversation_}>
            <img className={classes.profileImg} src={props.user.avatar}></img>
            <div className={classes.profileInfo}>
                <div>{props.user.name}</div>
                <div>{props.user.isOnline ? "Online" : "Offline"}</div>
            </div>
        </div>
    )
}

export default FriendCard;