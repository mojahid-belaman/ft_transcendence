import { useContext, useEffect, useState } from 'react';
import socket from '../../Library/Socket';
// import SocketContext from '../../../main/navigationbar/data_context/socket-context';
import OnlineCard from './OnlineCard'
import classes from './OnlineList.module.css'
function OnlineList() {

    const [users, setUsers] = useState<any[]>([]);

    // const socketContext = useContext(SocketContext);
    
    useEffect(() => {
        socket.emit("onlineFriends");
        socket.on("getOnlineFriends", (data: any) => setUsers(data))
        socket.on("addedNewOnlineFriend", (data: any) => {
            console.log("Hola");
            if (!users.find(user => user.id === data.id))
                setUsers([...users, data]);
        });
        socket.on("RemoveOnlineFriend", (data: any) => setUsers(users.filter(user => user.id !== data.id)))
        socket.on("RemoveFriend", (data: any) => setUsers(users.filter(user => user.id !== data.id)))
    }, [])

    return users.length !== 0 ? (
        <div className={classes.list}>
            {users.map((user, index) => <OnlineCard key={index} {...user} /> )}
        </div>) : <></>
    }
export default OnlineList