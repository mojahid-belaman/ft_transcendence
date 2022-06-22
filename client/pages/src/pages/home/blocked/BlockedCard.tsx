import { useContext } from 'react'
import SocketContext from '../../../main/navigationbar/data_context/socket-context';
import SocketContexProvider from '../../../main/navigationbar/data_context/socket-context'
import classes from './BlockedCard.module.css';
import Cookies from 'js-cookie';

const BlockedCard = (props: any) => {
    const token = Cookies.get('access_token');
    const socketContext = useContext(SocketContext);
    const addFriend = () => {
        console.log("Client Socket");
        socketContext.socket.emit("addFriend", {token: token});
    }
    return(<div className={classes.blockedCard}>
        <img src="https://i.pinimg.com/474x/ec/e2/b0/ece2b0f541d47e4078aef33ffd22777e.jpg"></img>
            <div>shikma</div>
        {/* <div> { props.username }</div> */}
        <div className={classes.buttons}>
            <button /* onClick={addFriend} */ >Unblock</button>
        </div>
    </div>)
}
export default BlockedCard