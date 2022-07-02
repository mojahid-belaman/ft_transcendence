import axios from 'axios';
import { useContext, useEffect, useState } from 'react'
import BlockedCard from './BlockedCard'
import classes from './BlockedList.module.css'
import Cookies from 'js-cookie';
import SocketContext from '../../../main/navigationbar/data_context/socket-context';

function BlockedList() {
    const [blocked, setBlocked] = useState<any[]>([]);

    const socketContext = useContext(SocketContext);

    useEffect(() => {
        socketContext.socket.emit("blockedFriends");
        socketContext.socket.addEventListener("blockedFriendsList", (data: any) => {
            console.log(data);
            setBlocked(data)
        })
        socketContext.socket.addEventListener("RemoveBlockedFriend", (data: any) => {
            console.log(data);
            setBlocked(blocked.filter(user => user.id !== data.id))
        })
    }, [])
    
    return (<div className={classes.list}>
        {/* <BlockedCard key={index} {...user} /> */}
        {
            blocked.length !== 0 && blocked.map((user, index) => {
                return (
                    <BlockedCard key={index} {...user} />
                )
            })
        }
    </div>)
}
export default BlockedList