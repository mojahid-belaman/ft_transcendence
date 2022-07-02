import axios from 'axios';
import { useEffect, useState, useContext } from 'react'
import PendingCard from './PendingCard'
import classes from './PendingList.module.css'
import SocketContext from '../../../main/navigationbar/data_context/socket-context';

const PendingList = () => {
    const socketContext = useContext(SocketContext);
    const [pendingFriendships, setPendingFriendships] = useState<any[]>([])
    
    socketContext.socket.addEventListener("addedNewPendingFriendship", (data: any) => {
        console.log("addedNewPendingFriendship");
        setPendingFriendships([...pendingFriendships, data]);
    });

    socketContext.socket.addEventListener("pendingFriendsList", (data: any) => {
        setPendingFriendships([...data]);
    });

    socketContext.socket.addEventListener("RemovependingFriends", (data: any) => {
        setPendingFriendships(pendingFriendships.filter(user => (user.id !== data.firstId && user.id !== data.secondId)));
    });

    socketContext.socket.addEventListener("rejectFriendship", (data: any) => {
        console.log(data);
        setPendingFriendships(pendingFriendships.filter(user => user.id !== data.id))
    })

    useEffect(() => {
        socketContext.socket.emit("pendingFriends");
        return () => {
            setPendingFriendships([])
        }
    }, [])
    
    return (
    <div className={classes.list}>
        <div>
            {pendingFriendships.length !== 0 && pendingFriendships.map((pendingFriendship: any, index) => {
                return(<PendingCard key={index} {...pendingFriendship} />)
            })}
        </div>
    </div>
    )
}
export default PendingList