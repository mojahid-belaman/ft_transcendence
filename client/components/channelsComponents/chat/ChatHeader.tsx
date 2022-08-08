import { useState } from 'react';
import { AiFillEdit } from 'react-icons/ai';
import classes from './ChatHeader.module.css'
import EditChannel from './editChannel/EditChannel';

function ChatHeader(props: any) {
    const [backdrop1, setBackdrop1] = useState(false);
    function OpenCloseModal1() {
        if (backdrop1 === false)
            setBackdrop1(true);
        else
            setBackdrop1(false);
    }
    return props.channel ? (<div className={classes.chatWrapper}>
        <button className={classes.chatHeader} onClick={props.toggle} >
            <img src="https://www.nicepng.com/png/detail/791-7911739_icon-for-multi-channel-messaging-multi-channel-icon.png"></img>
            <div className={classes.info}>
                <div>{props.channel.name}</div>
            </div>
        </button>
        {/* if the user is admin/owner */}
        <button onClick={OpenCloseModal1} className={classes.buttonEdit}><AiFillEdit/></button>
        {backdrop1 ? <EditChannel channelId={props.channel.channelId} OpenClose={OpenCloseModal1} /> : null}
    </div>) : <></>
}
export default ChatHeader