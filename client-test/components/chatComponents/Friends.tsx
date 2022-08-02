import { useContext } from 'react';
import Chat from './chat/Chat';
import DataContex from './data_context/data-context';
import FriendCard from './FriendCard';
import classes from './Friends.module.css'

function Friends( ) {
    const dataContextVar = useContext(DataContex);
    return <div className={classes.mainCard}>
        <div className={classes.friendList}>
            <input type="text" /* value="" */ placeholder="  Search..."/>
           {dataContextVar.data.map((user:any)=><FriendCard key={user.userId} user={user}/>) }
        </div>
        <Chat user={dataContextVar.selectedConversation} />
    </div>
}

export default Friends;