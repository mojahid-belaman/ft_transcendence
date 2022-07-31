import Chat from '../../channel_components/chat/Chat';
import classes from './Channels.module.css'

import { useContext, useState } from 'react';
import DataChannel, { DataChannelProvider } from '../../channel_components/data_context/data-context';
import ChannelCard from '../../channel_components/ChannelCard';
import NewChannel from '../../channel_components/newChannel/NewChannel';
import MainApp from '../../main/MainApp';
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
const Channels = () => {
    const [backdrop, setBackdrop] = useState(false);
    const [status, setStatus] = useState("");
    function OpenCloseModal() {
        if (backdrop === false)
            setBackdrop(true);
        else
            setBackdrop(false);
    }
    const dataChannelVar = useContext(DataChannel);

    return
    (
        <MainApp>
            <DataChannelProvider>
                <div className={classes.mainCard}>
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
                                status === "protected" ? <ProtectedCard /> : null
                    }
                    {backdrop ? <NewChannel OpenClose={OpenCloseModal} /> : null}
                </div>
            </DataChannelProvider>
        </MainApp>)
}

export default Channels;