import { useContext } from 'react'
import SocketContext from '../../../main/navigationbar/data_context/socket-context';
import SocketContexProvider from '../../../main/navigationbar/data_context/socket-context'
import classes from './PendingCard.module.css';
import Cookies from 'js-cookie';

const PendingCard = (props: any) => {
    const token = Cookies.get('access_token');
    const socketContext = useContext(SocketContext);
    const addFriend = () => {
        console.log("Client Socket");
        socketContext.socket.emit("addFriend", {token: token});
    }
    return(<div className={classes.pendingCard}>
        <img src="https://i.pinimg.com/474x/ec/e2/b0/ece2b0f541d47e4078aef33ffd22777e.jpg"></img>
            <div>shikma</div>
        {/* <div> { props.username }</div> */}
        <div className={classes.buttons}>
            <button onClick={addFriend}>accept</button>
            <button onClick={addFriend}>deny</button>
        </div>
    </div>)
}
export default PendingCard