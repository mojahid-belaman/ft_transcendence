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

    socket.on("startGame", data => {
        console.log(data);
        router.push(`/game?sender=${data?.room.sender}&receiever=${data?.room.receiver}`)
    })
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
            }><FriendCard key={user.id} user={user} /></div>)}
        </div>
        {dataContextVar.selectedConversation && (<Chat user={dataContextVar.selectedConversation} login={username} />)}
    </div>
}

export default Friends;