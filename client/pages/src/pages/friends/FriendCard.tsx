import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import DataContex from './data_context/data-context';
import classes from './FriendCard.module.css'
function FriendCard(props:any) {
    const dataContextVar = useContext(DataContex);
    const history = useHistory();

    function setConversation_(){
        // dataContextVar.setConversation(props.user.conversationId);
        history.push(`/chat?name=${props.user.name}`)
    }
    return (
        <div className={classes.friendButton} onClick={setConversation_}>
            <img className={classes.profileImg} src="https://i.pinimg.com/474x/ec/e2/b0/ece2b0f541d47e4078aef33ffd22777e.jpg"></img>
            <div className={classes.profileInfo}>
                <div>{props.user.name}</div>
                <div>{props.user.isOnline ? "online" : "offline"}</div>
            </div>
        </div>
    )
}

export default FriendCard;