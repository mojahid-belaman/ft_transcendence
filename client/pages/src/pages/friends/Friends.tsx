import { useContext } from 'react';
import Chat from './chat/Chat';
import DataContex from './data_context/data-context';
import FriendCard from './FriendCard';
import classes from './Friends.module.css'

function Friends( ) {
    const dataContextVar = useContext(DataContex);
    console.log(dataContextVar)
    return <div className={classes.mainCard}>
        <div className={classes.friendList}>
            <input type="text" placeholder="  Search..."/>
           {dataContextVar.data.map((user:any)=>{               
           return <FriendCard key={user.userId} user={user}/>
           }) }
        </div>
        <Chat user={dataContextVar.selectedConversation} />
    </div>
}

export default Friends;