import { useContext } from 'react'
// import SocketContext from '../../../main/navigationbar/data_context/socket-context';
import classes from './PendingCard.module.css';
import Cookies from 'js-cookie';
import socket from '../../Library/Socket';

const PendingCard = (props: any) => {
    // const socketContext = useContext(SocketContext);
    const acceptFriend = () => {
        // console.log("Client Socket");
        // socket.emit("acceptFriend", {userId: props.id});
    }
    const denyFriend = () => {
        // socket.emit("refuseFriend", {userId: props.id});
    }
    return(<div className={classes.pendingCard}>
        <img src="https://i.pinimg.com/474x/ec/e2/b0/ece2b0f541d47e4078aef33ffd22777e.jpg"></img>
        <div> { props.username }</div>
        <div className={classes.buttons}>
            <button /* onClick={acceptFriend} */>accept</button>
            <button /* onClick={acceptFriend} */>deny</button>
        </div>
    </div>)
}
export default PendingCard