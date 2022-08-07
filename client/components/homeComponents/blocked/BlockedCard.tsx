import classes from './BlockedCard.module.css';
import socket from '../../Library/Socket';

const BlockedCard = (props: any) => {
    const unblockFriend = () => {
        socket.emit("unblockFriend", {blockedUserId: props.id});
    }
    return(<div className={classes.blockedCard}>
        <img src={props.avatar}></img>
        <div> { props.username }</div>
        <div className={classes.buttons}>
          {props.isBlocking && <button onClick={unblockFriend} >Unblock</button>}
        </div>
    </div>)
}
export default BlockedCard