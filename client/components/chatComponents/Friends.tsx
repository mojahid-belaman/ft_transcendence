import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import socket from '../Library/Socket';
import Chat from './chat/Chat';
import DataContex from './data_context/data-context';
import FriendCard from './FriendCard';
import classes from './Friends.module.css'

function Friends() {

    const router = useRouter();
    const dataContextVar = useContext(DataContex);
    const [username, setUsername] = useState(router.query.username !== undefined ? router.query.username : false);

    useEffect(()=> {
        socket.on("startGame", data => {
            console.log("start game : on startGame");
            console.log(data);
            router.push(`/game?room_id=${data?.room.sender}${data?.room.receiver}`)
        })
        return(()=> {
            socket.off('startGame');
        })
    }, [])
    useEffect(() => {
        if (username)
            dataContextVar.getConversationByLogin(username);
    }, [dataContextVar.data, username])

    return <div className={classes.mainCard}>
        <div className={classes.friendList}>
            {dataContextVar.data.map((user: any) => <div key={user.id} onClick={() => {
                    setUsername(user.login);
                    router.push(`chat?username=${user.login}`);
                    dataContextVar.getConversationByLogin(user.login);
                }
            }><FriendCard user={user} /></div>)}
        </div>
        {dataContextVar.selectedConversation && (<Chat user={dataContextVar.selectedConversation} login={username} />)}
    </div>
}

export default Friends;