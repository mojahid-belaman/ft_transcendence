
import { useContext, useEffect, useState } from 'react'
// import SocketContext from '../../../main/navigationbar/data_context/socket-context';
import AllCard from './AllCard'
import classes from './AllFriends.module.css'
import Cookies from 'js-cookie';
import { BiBody } from 'react-icons/bi';
import socket from '../../Library/Socket';

const AllFriends = () => {

    const [users, setUsers] = useState<any[]>([]);
    
    useEffect(() => {
        socket.emit("allFriends");
        socket.on("getAllFriends", (data: any) => setUsers(data))
        socket.on("addedNewFriendship", (data: any) => setUsers([...users, data]))
        socket.on("RemoveFriend", (data: any) => setUsers(users.filter(user => user.id !== data.id)))
    }, [])
    
    return (<div className={classes.list}>
        {users.length !== 0 && users.map((user, index) => (
            <AllCard key={index} {...user} />
        ))}
    </div>)
}
export default AllFriends