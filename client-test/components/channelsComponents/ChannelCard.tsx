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
            <img className={classes.channelImg} src="https://i.pinimg.com/474x/ec/e2/b0/ece2b0f541d47e4078aef33ffd22777e.jpg"></img>
            <div className={classes.channelInfo}>
                <div>{props.channel.name}</div>
            </div>
            {props.channel.status === channelStatus.PRIVATE? <AiFillLock/> :null}
        </button>
    )
}

export default ChannelCard;