

import { useState } from 'react';
import ProfileModal from '../../../profileModal/ProfileModal';
import classes from './Chat.module.css'
import ChatHeader from './ChatHeader';
import MessageCard from './MessageCard';
function Chat(props) {
    const [backdrop, setBackdrop] = useState(false);
    function OpenCloseModal() {
        if (backdrop === false)
            setBackdrop(true);
        else
            setBackdrop(false);
    }
    const [messagelist, setMessageList] = useState([]);
    const [CurentMessage, setCurentMessage] = useState("");
    function Message() {
        if (CurentMessage !== "") {
            setMessageList((list) => [...list, CurentMessage])
            setCurentMessage("")
        }
    }
    return <div className={classes.chatCard}>
        <ChatHeader user={props.user} toggle={OpenCloseModal} />
        <div className={classes.chatContent} >
            <div className={classes.chatMessages}>
                {messagelist.map((message) => (

                    <MessageCard message={message} />
                ))}
            </div>
            <div className={classes.chatFooter}>
                <input value={CurentMessage} placeholder="  Hey..." type="text" onChange={(event) => {
                    setCurentMessage(event.target.value);
                }} onKeyPress={(event) => {
                    if (event.key === "Enter") {
                        Message();
                    };
                }} />
                <button onClick={Message}>&#9658;</button></div>
            {backdrop ? <ProfileModal OpenClose={OpenCloseModal} /> : null} {/* Needs the user's data */}
        </div>
    </div>
}
export default Chat;