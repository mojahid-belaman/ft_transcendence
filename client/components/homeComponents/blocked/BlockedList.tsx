import { useEffect, useState } from 'react'
import socket from '../../Library/Socket';
import BlockedCard from './BlockedCard'
import classes from './BlockedList.module.css'
// import SocketContext from '../../../main/navigationbar/data_context/socket-context';

function BlockedList() {
    const [blocked, setBlocked] = useState<any[]>([]);

    useEffect(() => {
        socket.emit("blockedFriends");
        socket.on("blockedFriendsList", (data: any) => setBlocked(data))
        socket.on("RemoveBlockedFriend", (data: any) => setBlocked(blocked.filter(user => user.id !== data.id)))
        return () => {
            socket.off("blockedFriendsList")
            socket.off("RemoveBlockedFriend")
        }
    }, [])

    return (<div className={classes.list}>
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