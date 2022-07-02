import { useContext, useEffect, useState } from 'react';
import SocketContext from '../../../main/navigationbar/data_context/socket-context';
import OnlineCard from './OnlineCard'
import classes from './OnlineList.module.css'
function OnlineList() {

    const [users, setUsers] = useState<any[]>([]);

    const socketContext = useContext(SocketContext);
    
    useEffect(() => {
        socketContext.socket.emit("onlineFriends");
        socketContext.socket.addEventListener("getOnlineFriends", (data: any) => setUsers(data))
        socketContext.socket.addEventListener("addedNewOnlineFriend", (data: any) => {
            console.log("Hola");
            if (!users.find(user => user.id === data.id))
                setUsers([...users, data]);
        });
        socketContext.socket.addEventListener("RemoveOnlineFriend", (data: any) => setUsers(users.filter(user => user.id !== data.id)))
        socketContext.socket.addEventListener("RemoveFriend", (data: any) => setUsers(users.filter(user => user.id !== data.id)))
    }, [])

    return users.length !== 0 && (
        <div className={classes.list}>
            {users.map((user, index) => <OnlineCard key={index} {...user} /> )}
        </div>)
    }
export default OnlineList