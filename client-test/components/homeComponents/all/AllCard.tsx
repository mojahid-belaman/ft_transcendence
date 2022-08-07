import axios from 'axios'
import Cookies from 'js-cookie'
import socket from '../../Library/Socket'
import classes from './AllCard.module.css'

const AllCard = (props: any) => {


    const msgHandler = () => {}
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