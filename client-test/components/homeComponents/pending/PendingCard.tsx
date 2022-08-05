import classes from './PendingCard.module.css';
import socket from '../../Library/Socket';

const PendingCard = (props: any) => {
    const acceptFriend = () => {
        socket.emit("acceptFriend", {userId: props.id});
        console.log("Hello");
        
    }
    const denyFriend = () => {
        socket.emit("refuseFriend", {userId: props.id});
    }
    return(<div className={classes.pendingCard}>
        <img src={props.avatar}></img>
        <div> { props.username }</div>
        <div className={classes.buttons}>
            <button onClick={acceptFriend}>accept</button>
            <button /* onClick={acceptFriend} */>deny</button>
        </div>
    </div>)
}
export default PendingCard