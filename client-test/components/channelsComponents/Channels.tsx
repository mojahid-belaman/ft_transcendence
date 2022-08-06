import classes from './Channels.module.css'

import { useContext, useEffect, useState } from 'react';
import DataChannel from './data_context/data-context';
import ChannelCard from './ChannelCard';
import Chat from './chat/Chat';
import NewChannel from './newChannel/NewChannel';
import { useRouter } from 'next/router';
import socket from '../Library/Socket';

export enum channelStatus {
    PUBLIC = "Public",
    PRIVATE = "Private",
    PROTECTED = "Protected"
}

function PrivateCard() {
    return (
        <div className={classes.privateDiv}>
            <div className={classes.privateCard}>This Chat Room is Private !</div>
        </div>)
}

function ProtectedCard() {
    return (
        <form className={classes.passwordDiv}>
            <div className={classes.password}>
                <label> Enter password : </label>
                <input type="password" name="name" required />
                <button className={classes.buttons}>Join</button>
            </div>
        </form>)
}

function ChannelsComponent() {
    const router = useRouter();
    const [channel, setChannel] = useState(router.query.channel !== undefined ? router.query.channel : false);
    const [backdrop, setBackdrop] = useState(false);
    const [status, setStatus] = useState("");
    function OpenCloseModal() {
        if (backdrop === false)
            setBackdrop(true);
        else
            setBackdrop(false);
    }
    const dataChannelVar = useContext(DataChannel);

    socket.on("JoinedOrNot", (data) => setStatus(data.status));

    useEffect(() => {
        console.log(channel);
        console.log(dataChannelVar.data);
    }, [])

    return <div className={classes.mainCard}>
        <div className={classes.channelList}>
            <button onClick={OpenCloseModal} className={classes.createChannel}>
                <i className="fa-solid fa-circle-plus"></i>
                <div className={classes.text}>Create Channel</div>
            </button>
            {dataChannelVar.data.map((channel: any) => (
                <div key={channel.channelId} onClick={() => { setChannel(channel.channelId); router.push(`channels?name=${channel.name}`); socket.emit("joinChannel", channel.channelId) }}>
                    <ChannelCard key={channel.channelId} channel={channel} setStatus={setStatus} />
                </div>))
            }

        </div>
        {
            status == channelStatus.PUBLIC ? <Chat channel={dataChannelVar.selectedConversation} /> :
                status === channelStatus.PRIVATE ? <PrivateCard /> :
                    status === channelStatus.PROTECTED ? <ProtectedCard/> : null
        }
        {backdrop ? <NewChannel OpenClose={OpenCloseModal} /> : null}
    </div>
}

export default ChannelsComponent;