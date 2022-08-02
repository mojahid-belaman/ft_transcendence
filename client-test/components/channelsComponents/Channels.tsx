import classes from './Channels.module.css'

import { useContext, useState } from 'react';
import DataChannel from './data_context/data-context';
import ChannelCard from './ChannelCard';
import Chat from './chat/Chat';
import NewChannel from './newChannel/NewChannel';
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
    const [backdrop, setBackdrop] = useState(false);
    const [status, setStatus] = useState("");
    function OpenCloseModal() {
        if (backdrop === false)
            setBackdrop(true);
        else
            setBackdrop(false);
    }
    const dataChannelVar = useContext(DataChannel);

    return <div className={classes.mainCard}>
        <div className={classes.channelList}>
            <input type="text" placeholder="  Search..." />
            <button onClick={OpenCloseModal} className={classes.createChannel}>
                <i className="fa-solid fa-circle-plus"></i>
                <div className={classes.text}>Create Channel</div>
            </button>
            {dataChannelVar.data.map((channel: any) => <ChannelCard key={channel.channelId} channel={channel} setStatus={setStatus} />)}

        </div>
        {
            status == "public" ? <Chat channel={dataChannelVar.selectedConversation} /> :
                status === "private" ? <PrivateCard /> :
                    status === "protected" ? <ProtectedCard/> : null
        }
        {backdrop ? <NewChannel OpenClose={OpenCloseModal} /> : null}
    </div>
}

export default ChannelsComponent;