import { useState } from 'react';
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
    return <div className={classes.chatWrapper}>
        <button className={classes.chatHeader} onClick={props.toggle} >
            <img src="https://i.pinimg.com/474x/ec/e2/b0/ece2b0f541d47e4078aef33ffd22777e.jpg"></img>
            <div className={classes.info}>
                <div>{props.channel.name}</div>
            </div>
        </button>
        {/* if the user is admin/owner */}
        <button onClick={OpenCloseModal1} className={classes.buttonEdit}>Edit</button>
        {backdrop1 ? <EditChannel OpenClose={OpenCloseModal1} /> : null}
    </div>
}
export default ChatHeader