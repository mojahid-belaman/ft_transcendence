import { useContext } from 'react';
import { AiFillLock } from 'react-icons/ai';
import classes from './ChannelCard.module.css'
import { channelStatus } from './Channels';
import DataChannel from './data_context/data-context';
function ChannelCard(props:any) {
    const dataChannelVar = useContext(DataChannel);
    function setConversation_(){
        dataChannelVar.setConversation(props.channel.conversationId)
        props.setStatus(props.channel.status);
    }
    return (
        <button className={classes.channelButton} onClick={setConversation_}>
            <img className={classes.channelImg} src="https://www.nicepng.com/png/detail/791-7911739_icon-for-multi-channel-messaging-multi-channel-icon.png"></img>
            <div className={classes.channelInfo}>
                <div>{props.channel.name}</div>
            </div>
            {props.channel.status === channelStatus.PRIVATE? <AiFillLock/> :null}
        </button>
    )
}

export default ChannelCard;