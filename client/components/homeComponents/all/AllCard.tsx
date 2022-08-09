import axios from 'axios'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import socket from '../../Library/Socket'
import classes from './AllCard.module.css'

const AllCard = (props: any) => {


    const history = useRouter()
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
    const unfriendHandler = async () => socket.emit("RemoveFriendship", {friendId: props.id})
    const blockdHandler = () => socket.emit("blockFriend", {blockedUserId: props.id})

    return(<div className={classes.allCard}>
        <img alt="" src={props.avatar}></img>
        <div>{props.username}</div>
        <div className={classes.buttons}>
            <button onClick={msgHandler}> Msg </button>
            <button onClick={unfriendHandler}> Unfriend </button>
            <button onClick={blockdHandler}> Block </button>
        </div>
    </div>)
}
export default AllCard