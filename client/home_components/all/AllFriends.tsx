
import { useContext, useEffect, useState } from 'react'
import SocketContext from '../../main/navigationbar/data_context/socket-context';
import AllCard from './AllCard'
import classes from './AllFriends.module.css'
import Cookies from 'js-cookie';
import { BiBody } from 'react-icons/bi';

const AllFriends = () => {

    const [users, setUsers] = useState<any[]>([]);

    const socketContext = useContext(SocketContext);
    
    useEffect(() => {
        socketContext.socket.emit("allFriends");
        socketContext.socket.addEventListener("getAllFriends", (data: any) => setUsers(data))
        socketContext.socket.addEventListener("addedNewFriendship", (data: any) => setUsers([...users, data]))
        socketContext.socket.addEventListener("RemoveFriend", (data: any) => setUsers(users.filter(user => user.id !== data.id)))
    }, [])
    
    return (<div className={classes.list}>
        {users.length !== 0 && users.map((user, index) => (
            <AllCard key={index} {...user} />
        ))}
    </div>)
}
export default AllFriends