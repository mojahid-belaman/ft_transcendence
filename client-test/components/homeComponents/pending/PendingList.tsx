import axios from 'axios';
import { useEffect, useState, useContext } from 'react'
import socket from '../../Library/Socket';
import PendingCard from './PendingCard'
import classes from './PendingList.module.css'
// import SocketContext from '../../../main/navigationbar/data_context/socket-context';

const PendingList = () => {
    const [pendingFriendships, setPendingFriendships] = useState<any[]>([])
    
    socket.on("addedNewPendingFriendship", (data: any) => {
        console.log("addedNewPendingFriendship");
        setPendingFriendships([...pendingFriendships, data]);
    });

    socket.on("pendingFriendsList", (data: any) => {
        setPendingFriendships([...data]);
    });

    socket.on("RemovependingFriends", (data: any) => {
        setPendingFriendships(pendingFriendships.filter(user => (user.id !== data.firstId && user.id !== data.secondId)));
    });

    socket.on("rejectFriendship", (data: any) => {
        console.log(data);
        setPendingFriendships(pendingFriendships.filter(user => user.id !== data.id))
    })

    useEffect(() => {
        socket.emit("pendingFriends");
        return () => {
            setPendingFriendships([])
        }
    }, [])
    
    return (
    <div className={classes.list}>
        <div>
            {pendingFriendships.length !== 0 && pendingFriendships.map((pendingFriendship: any, index) => {
                 return( 
                    <PendingCard />
                    ) 
             })}
        </div>
    </div>
    )
}
export default PendingList