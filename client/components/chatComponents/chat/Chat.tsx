import { useEffect, useState } from 'react';
import ProfileModal from './profileModal/ProfileModal';
import classes from './Chat.module.css'
import ChatHeader from './ChatHeader';
import MessageCard from './MessageCard';
import socket from '../../Library/Socket';
import axios from 'axios';
import Cookies from 'js-cookie';

function Chat(props: any) {
    const [backdrop, setBackdrop] = useState(false);
    const [user, setUser] = useState<any>({});
    function OpenCloseModal() {
        if (backdrop === false)
            setBackdrop(true);
        else
            setBackdrop(false);
    }
    const [messagelist, setMessageList]: any = useState([]);
    const [CurentMessage, setCurentMessage] = useState("");
    const [allowed, setAllowed] = useState(true)
    const [message, setMessage] = useState("")

    function Message() {
        if (CurentMessage !== "") {
            socket.emit("SendMessage", { receiverLogin: props.user.login, CurentMessage })
            const date = new Date();

            setMessageList((list: any) => [...list, { CurentMessage, user: { ...user }, date: date.toISOString() }])
            setCurentMessage("")
        }
    }

    socket.on("receieveMessage", (newMessage: any) => {
        //console.log("Received message => ", newMessage);
        setMessageList([...messagelist, newMessage])
        setCurentMessage("")
    })
    const getCurrentConv = async () => {
        const token = Cookies.get("access_token");
        await axios.get(`http://localhost:5000/conversations/messages/${props.login}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((res) => {
            //console.log("Debugging => ", res.data.messages);
            setMessageList([...res.data.messages])
            setUser(res.data.user)
        });
    }

    useEffect(() => {
        if (props.login)
            getCurrentConv();
    }, [props.login])

    return user.id ? (<div className={classes.chatCard}>
        <ChatHeader user={props.user} toggle={OpenCloseModal} setAllowed={setAllowed} setMessage={setMessage} />
        <div className={classes.chatContent} >
            <div className={classes.chatMessages}>
                {messagelist.map((message: any, index: number) => {
                    return (
                        <MessageCard key={index} message={message} />
                    )
                })}
            </div>
            <div className={classes.chatFooter}>
                { allowed ? (<input
                    value={CurentMessage}
                    placeholder="  Hey..."
                    type="text"
                    onChange={(event) => setCurentMessage(event.target.value)}
                    onKeyPress={(event) => {
                        if (event.key === "Enter") {
                            Message();
                        };
                    }} />) : <h3 style={{textAlign: "center"}}>{message}</h3>}
                <button onClick={Message}>&#9658;</button></div>
            {backdrop ? <ProfileModal OpenClose={OpenCloseModal} user={props.user} /> : null} {/* Needs the user's data */}
        </div>
    </div>) : <></>
}
export default Chat;