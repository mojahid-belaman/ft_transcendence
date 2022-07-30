import { useContext } from 'react'
// import SocketContext from '../../../main/navigationbar/data_context/socket-context';
import classes from './BlockedCard.module.css';
import Cookies from 'js-cookie';
import socket from '../../Library/Socket';

const BlockedCard = (props: any) => {
    // const socketContext = useContext(SocketContext);
    const unblockFriend = () => {
        console.log("Here");
        socket.emit("unblockFriend", {blockedUserId: props.id});
    }
    return(<div className={classes.blockedCard}>
        <img src="https://i.pinimg.com/474x/ec/e2/b0/ece2b0f541d47e4078aef33ffd22777e.jpg"></img>
        <div> { props.username }</div>
        <div className={classes.buttons}>
          {props.isBlocking && <button onClick={unblockFriend} >Unblock</button>}  
        </div>
    </div>)
}
export default BlockedCard