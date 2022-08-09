import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import socket from '../../Library/Socket';
// import SocketContext from '../../../main/navigationbar/data_context/socket-context';
import classes from './OnlineCard.module.css'

const OnlineCard =  (props: any) => {

    // const socketContext = useContext(SocketContext);

    const history = useRouter();

    const msgHandler = async () => {
        const token = Cookies.get("access_token");
        const data = {
            secondId: props.id,
            content: "Hi..!"
        }
        await axios.post(`${process.env.BACKEND_URL}/conversations/messages/goTo`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }).then(data => data)
        .catch(err => err)
        history.push(`/chat?username=${props.login}`)
    }
    const unfriendHandler = () => socket.emit("RemoveFriendship", {friendId: props.id})
    const blockdHandler = () => socket.emit("blockFriend", {blockedUserId: props.id})

    return(<div className={classes.onlineCard}>
        <img src={props.avatar}></img>
        <div>{props.username}</div>
        <div className={classes.buttons}>
            <button onClick={msgHandler}> Msg </button>
            <button onClick={unfriendHandler}> Unfriend </button>
            <button onClick={blockdHandler}> Block </button>
        </div>
    </div>)
}
export default OnlineCard