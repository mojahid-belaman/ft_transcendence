import Chat from './chat/Chat';
import ChannelCard from './ChannelCard';
import classes from './Channels.module.css'

import { useContext, useState } from 'react';
import DataChannel from './data_context/data-context';
import NewChannel from './newChannel/NewChannel';
function Channels(props:any) {
    const [backdrop, setBackdrop] = useState(false);
    function OpenCloseModal() {
        if (backdrop === false)
            setBackdrop(true);
        else
            setBackdrop(false);
    }
    const dataChannelVar = useContext(DataChannel);
    return <div className={classes.mainCard}>
        <div className={classes.channelList}>
            <input type="text" /* value="" */ placeholder="  Search..." />
            <button onClick={OpenCloseModal} className={classes.createChannel}>
                <i className="fa-solid fa-circle-plus"></i>
                <div className={classes.text}>Create Channel</div>
            </button>
            {dataChannelVar.data.map((channel:any) => <ChannelCard key={channel.channelId} channel={channel} />)}
            
        </div>
        <Chat toggle={props.toggle} channel={dataChannelVar.selectedConversation} />
        {backdrop ? <NewChannel OpenClose={OpenCloseModal}  /> : null}
    </div>
}

export default Channels;