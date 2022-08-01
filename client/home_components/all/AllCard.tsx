import { useContext } from 'react'
import { useHistory } from 'react-router-dom';
import SocketContext from '../../main/navigationbar/data_context/socket-context'
import classes from './AllCard.module.css'

const AllCard = (props: any) => {

    const socketContext = useContext(SocketContext);
    const history = useHistory();

    const msgHandler = () => history.push(`/chat?username=${props.username}`)
    const unfriendHandler = () => socketContext.socket.emit("RemoveFriendship", {friendId: props.id})
    const blockdHandler = () => socketContext.socket.emit("blockFriend", {blockedUserId: props.id})

    return(<div className={classes.allCard}>
        <img alt="" src="https://i.pinimg.com/474x/ec/e2/b0/ece2b0f541d47e4078aef33ffd22777e.jpg"></img>
        <div>{props.username}</div>
        <div className={classes.buttons}>
            <button onClick={msgHandler}> Msg </button>
            <button onClick={unfriendHandler}> Unfriend </button>
            <button onClick={blockdHandler}> Block </button>
        </div>
    </div>)
}
export default AllCard