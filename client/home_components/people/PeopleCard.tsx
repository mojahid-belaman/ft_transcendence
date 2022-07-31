import { useContext, useEffect, useState } from 'react'
import classes from './PeopleCard.module.css';
import Cookies from 'js-cookie';
import SocketContext from '../../main/navigationbar/data_context/socket-context';

const PeopleCard = (props: any) => {
    const socketContext = useContext(SocketContext);
    const [isSent, setIsSent] = useState(false)
    useEffect(() => {
        socketContext.socket.addEventListener("addedNewPendingFriendship", (data: any) => {
            console.log(data);
        });
    }, [])
    
    const addFriend = () => {
        setIsSent(true)
        socketContext.socket.emit("addFriend", { userId: props.user.id});
    }
    
    return(<div className={classes.peopleCard}>
        <img src="https://i.pinimg.com/474x/ec/e2/b0/ece2b0f541d47e4078aef33ffd22777e.jpg"></img>
        <div> { props.user.username }</div>
        <div className={classes.buttons}>
            { !isSent && <button onClick={addFriend}>Add</button>}
        </div>
    </div>)
}
export default PeopleCard