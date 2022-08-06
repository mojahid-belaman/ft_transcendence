import { useContext } from 'react'
// import SocketContext from '../../../main/navigationbar/data_context/socket-context';
import classes from './PendingCard.module.css';
import Cookies from 'js-cookie';
import socket from '../../Library/Socket';

const PendingCard = (props: any) => {
    const acceptFriend = () => {
        socket.emit("acceptFriend", {userId: props.id});
    }
    const denyFriend = () => {
        socket.emit("refuseFriend", {userId: props.id});
    }
    return(<div className={classes.pendingCard}>
        <img src={props.avatar}></img>
        <div> { props.username }</div>
        <div className={classes.buttons}>
            <button onClick={acceptFriend}>accept</button>
            <button onClick={denyFriend}>deny</button>
        </div>
    </div>)
}
export default PendingCard