import Cookies from 'js-cookie';
import { useContext, useEffect, useState } from 'react'
import socket from '../../Library/Socket';
import classes from './PeopleCard.module.css';

const PeopleCard = (props: any) => {
    const [isSent, setIsSent] = useState(false)
    useEffect(() => {
        socket.on("addedNewPendingFriendship", (data: any) => {
            console.log(data);
        });
    }, [])
    
    const token = Cookies.get("access_token");
    const addFriend = () => {
        setIsSent(true)
        socket.emit("addFriend", { userId: props.user.id, token});
    }
    
    return(<div className={classes.peopleCard}>
        <img src={props.user.avatar}></img>
        <div> { props.user.username }</div>
        <div className={classes.buttons}>
            { !isSent && <button onClick={addFriend}>Add</button>}
        </div>
    </div>)
}
export default PeopleCard