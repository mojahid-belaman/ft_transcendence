import { useContext } from 'react';
import Chat from '../../friends_components/chat/Chat';
import DataContex, { DataContexProvider } from '../../friends_components/data_context/data-context';
import classes from './Friends.module.css'

function Friends( ) {
    const dataContextVar = useContext(DataContex);
    console.log(dataContextVar)
    return (<DataContexProvider></DataContexProvider>)

    {/* <div className={classes.mainCard}>
        <div className={classes.friendList}>
            <input type="text" placeholder="  Search..."/>
           {dataContextVar.data.map((user:any)=>{               
           return <FriendCard key={user.userId} user={user}/>
           }) }
        </div>
        <Chat user={dataContextVar.selectedConversation} />
    </div> */}
}

export default Friends;